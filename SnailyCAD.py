import sqlite3
import tkinter as tk
from tkinter import ttk, messagebox
import json
import requests
from ttkthemes import ThemedTk
from PIL import Image, ImageTk
import datetime
import os
import random
import hashlib
import aiohttp
import asyncio
import websockets

class SnailyCAD:
    def __init__(self):
        # FiveM server settings
        self.server_ip = "localhost" 
        self.server_port = "30120"
        self.api_url = f"http://{self.server_ip}:{self.server_port}"
        self.ws_url = f"ws://{self.server_ip}:{self.server_port}"
        
        # API endpoints
        self.endpoints = {
            'players': f"{self.api_url}/players.json",
            'info': f"{self.api_url}/info.json",
            'dynamic': f"{self.api_url}/dynamic.json"
        }

        # Create modern login window
        self.login_window = tk.Tk()
        self.login_window.config(bg="#1E1E1E")
        self.login_window.title("SnailyCAD Login")
        self.login_window.geometry("620x620")
        
        # Modern login UI elements with improved styling
        self.create_modern_login_ui()

        # Initialize database with improved schema
        self.db = sqlite3.connect('snaily_cad.db')
        self.cursor = self.db.cursor()
        self.init_user_database()
        
        # Initialize websocket for real-time updates
        self.ws = None
        self.loop = asyncio.get_event_loop()
        self.loop.create_task(self.init_websocket())

        # Start login window
        self.login_window.mainloop()

    def create_modern_login_ui(self):
        # Modern frame for login elements
        login_frame = tk.Frame(self.login_window, bg="#1E1E1E")
        login_frame.place(relx=0.5, rely=0.5, anchor="center")

        # Title label
        title_label = tk.Label(login_frame, text="SnailyCAD", font=("Segoe UI", 32, "bold"), bg="#1E1E1E", fg="white")
        title_label.pack(pady=20)

        # Username entry with modern styling
        self.username_entry = tk.Entry(login_frame, font=("Segoe UI", 12))
        self.username_entry.insert(0, "Username")
        self.username_entry.config(bg="#2D2D2D", fg="white", insertbackground="white")
        self.username_entry.pack(pady=10, ipady=8, ipadx=15)

        # Password entry with modern styling
        self.password_entry = tk.Entry(login_frame, show="•", font=("Segoe UI", 12))
        self.password_entry.config(bg="#2D2D2D", fg="white", insertbackground="white")
        self.password_entry.pack(pady=10, ipady=8, ipadx=15)

        # Modern buttons with hover effects
        self.login_button = tk.Button(login_frame, text="Login", 
                                    command=lambda: self.loop.create_task(self.handle_login()))
        self.login_button.config(bg="#2563EB", fg="white", font=("Segoe UI", 11), 
                               relief="flat", width=30, cursor="hand2")
        self.login_button.pack(pady=10)

        self.register_button = tk.Button(login_frame, text="Register",
                                       command=lambda: self.loop.create_task(self.handle_register()))
        self.register_button.config(bg="#374151", fg="white", font=("Segoe UI", 11),
                                  relief="flat", width=30, cursor="hand2")
        self.register_button.pack(pady=5)

    def init_user_database(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                department TEXT,
                badge_number TEXT,
                rank TEXT,
                permissions JSON,
                last_login TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        self.db.commit()

    async def init_websocket(self):
        try:
            self.ws = await websockets.connect(self.ws_url)
            self.loop.create_task(self.handle_websocket_messages())
        except Exception as e:
            print(f"WebSocket connection failed: {e}")

    async def handle_websocket_messages(self):
        while True:
            try:
                message = await self.ws.recv()
                data = json.loads(message)
                self.handle_realtime_update(data)
            except websockets.ConnectionClosed:
                await asyncio.sleep(5)
                await self.init_websocket()
            except Exception as e:
                print(f"WebSocket error: {e}")
                await asyncio.sleep(5)

    def handle_realtime_update(self, data):
        # Handle different types of real-time updates
        update_type = data.get('type')
        if update_type == 'player_join':
            self.handle_player_join(data)
        elif update_type == 'player_leave':
            self.handle_player_leave(data)
        elif update_type == 'emergency_call':
            self.handle_emergency_call(data)
        elif update_type == 'unit_status':
            self.handle_unit_status_change(data)

    def hash_password(self, password):
        salt = os.urandom(32)
        key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
        return salt + key

    def verify_password(self, stored_password, provided_password):
        salt = stored_password[:32]
        key = stored_password[32:]
        new_key = hashlib.pbkdf2_hmac('sha256', provided_password.encode(), salt, 100000)
        return key == new_key

    async def handle_login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        
        if not username or not password:
            messagebox.showerror("Error", "Please fill in all fields")
            return
            
        try:
            self.cursor.execute("SELECT * FROM users WHERE username=?", (username,))
            user = self.cursor.fetchone()
            
            if user and self.verify_password(user[2], password):
                self.current_user = {
                    'id': user[0],
                    'username': user[1],
                    'role': user[3],
                    'department': user[4],
                    'badge_number': user[5],
                    'rank': user[6],
                    'permissions': json.loads(user[7]) if user[7] else {}
                }
                
                # Update last login
                self.cursor.execute("""
                    UPDATE users SET last_login = CURRENT_TIMESTAMP 
                    WHERE id = ?
                """, (user[0],))
                self.db.commit()
                
                self.login_window.destroy()
                await self.init_main_window()
            else:
                messagebox.showerror("Error", "Invalid username or password")
                
        except Exception as e:
            messagebox.showerror("Error", f"Login failed: {str(e)}")

    async def handle_register(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        
        if not username or not password:
            messagebox.showerror("Error", "Please fill in all fields")
            return
            
        hashed_password = self.hash_password(password)
        default_permissions = json.dumps({
            "dispatch": True,
            "records": True,
            "citizens": True,
            "vehicles": True
        })
        
        try:
            self.cursor.execute("""
                INSERT INTO users (username, password, permissions) 
                VALUES (?, ?, ?)
            """, (username, hashed_password, default_permissions))
            self.db.commit()
            messagebox.showinfo("Success", "Registration successful!")
        except sqlite3.IntegrityError:
            messagebox.showerror("Error", "Username already exists")
        except Exception as e:
            messagebox.showerror("Error", f"Registration failed: {str(e)}")

    async def init_main_window(self):
        # Create modern themed window
        self.window = ThemedTk(theme="arc")
        self.window.title("SnailyCAD")
        self.window.geometry("1400x900")
        self.window.configure(bg='#1E1E1E')

        # Initialize modern UI components
        await self.init_modern_ui()
        
        # Start real-time data updates
        self.loop.create_task(self.start_realtime_updates())

    async def start_realtime_updates(self):
        while True:
            await self.refresh_fivem_data()
            await asyncio.sleep(5)

    async def refresh_fivem_data(self):
        async with aiohttp.ClientSession() as session:
            try:
                # Get online players
                async with session.get(self.endpoints['players']) as resp:
                    if resp.status == 200:
                        players = await resp.json()
                        self.update_players_list(players)

                # Get server info
                async with session.get(self.endpoints['info']) as resp:
                    if resp.status == 200:
                        info = await resp.json()
                        self.update_server_info(info)

                # Get dynamic data
                async with session.get(self.endpoints['dynamic']) as resp:
                    if resp.status == 200:
                        dynamic = await resp.json()
                        self.update_dynamic_data(dynamic)

            except Exception as e:
                print(f"Failed to refresh FiveM data: {e}")

    def __del__(self):
        if self.ws:
            self.loop.create_task(self.ws.close())
        self.db.close()

if __name__ == "__main__":
    app = SnailyCAD()
