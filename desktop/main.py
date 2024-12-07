import sys
from PyQt5.QtWidgets import QApplication
from ui_design import LoadingScreen

if __name__ == "__main__":
    app = QApplication(sys.argv)
    loading_screen = LoadingScreen()
    loading_screen.show()
    sys.exit(app.exec_())
