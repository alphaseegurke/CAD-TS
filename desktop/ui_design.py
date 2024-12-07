import time
import requests
from PyQt5.QtWidgets import (
    QMainWindow, QVBoxLayout, QPushButton, QLabel, QLineEdit, QWidget, QStackedWidget
)
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QMovie, QPixmap

class LoadingScreen(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("FiveM CAD System - Loading")
        self.setGeometry(100, 100, 600, 400)

        # Ladeanimation
        self.loading_gif = QLabel(self)
        self.loading_gif.setAlignment(Qt.AlignCenter)
        self.movie = QMovie("resources/loading.gif")
        self.loading_gif.setMovie(self.movie)
        self.movie.start()

        # Layout für Ladebildschirm
        layout = QVBoxLayout()
        layout.addWidget(self.loading_gif)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        # Timer, um zum Hauptbildschirm zu wechseln
        QTimer.singleShot(3000, self.show_main_ui)

    def show_main_ui(self):
        self.close()
        self.main_window = CADApp()
        self.main_window.show()

class CADApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("FiveM CAD System")
        self.setGeometry(100, 100, 800, 600)

        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)

        self.init_login_screen()

    def init_login_screen(self):
        layout = QVBoxLayout()

        # Hintergrundbild
        self.bg_label = QLabel()
        self.bg_label.setPixmap(QPixmap("resources/bg.png"))
        self.bg_label.setScaledContents(True)
        self.bg_label.setFixedHeight(300)

        # Login-UI
        self.username_label = QLabel("Username:")
        self.username_input = QLineEdit()
        self.password_label = QLabel("Password:")
        self.password_input = QLineEdit()
        self.password_input.setEchoMode(QLineEdit.Password)
        self.login_button = QPushButton("Login")
        self.login_button.clicked.connect(self.login)

        self.result_label = QLabel("")

        layout.addWidget(self.bg_label)
        layout.addWidget(self.username_label)
        layout.addWidget(self.username_input)
        layout.addWidget(self.password_label)
        layout.addWidget(self.password_input)
        layout.addWidget(self.login_button)
        layout.addWidget(self.result_label)

        container = QWidget()
        container.setLayout(layout)
        self.stacked_widget.addWidget(container)

    def login(self):
        username = self.username_input.text()
        password = self.password_input.text()
        try:
            response = requests.post(
                "http://127.0.0.1:5000/login",
                json={"username": username, "password": password},
            )
            if response.status_code == 200:
                self.result_label.setText("Login successful!")
                self.show_dashboard()
            else:
                self.result_label.setText("Login failed!")
        except Exception as e:
            self.result_label.setText("Error connecting to server!")

    def show_dashboard(self):
        layout = QVBoxLayout()
        dashboard_label = QLabel("Welcome to the CAD Dashboard!")
        dashboard_label.setAlignment(Qt.AlignCenter)

        layout.addWidget(dashboard_label)

        container = QWidget()
        container.setLayout(layout)
        self.stacked_widget.addWidget(container)
        self.stacked_widget.setCurrentWidget(container)
