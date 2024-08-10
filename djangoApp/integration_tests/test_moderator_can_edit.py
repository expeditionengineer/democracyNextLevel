
import os 
import time
from random import choice
os.environ["TMPDIR"] = "TMP/"

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class testAdminPanel(unittest.TestCase):

    def setUp(self):
        # Set up the WebDriver (example for Chrome)
        self.driver = webdriver.Firefox()
        # For Firefox:
        # self.driver = webdriver.Firefox(executable_path='/path/to/geckodriver')
    
    def tearDown(self):
        """Close the browser Window of every test."""
        if self.driver != None:
            print("Cleanup of test environment")
            self.driver.close()
            self.driver.quit()
    
    def test_moderator_can_edit_events(self):
        driver = self.driver
        # Open a website
        driver.get("http://127.0.0.1:8000/admin")

        # Example interaction: Find an element and perform an action
        # For instance, finding the search box and performing a search:
        usernameInput = driver.find_element(By.XPATH, "//input[@id='id_username']")
        usernameInput.send_keys("admin")
        passwordInput = driver.find_element(By.XPATH, "//input[@id='id_password']")
        passwordInput.send_keys("hallo12345")
        
        submitInput = driver.find_element(By.XPATH, "//input[@type='submit']")
        submitInput.click()
        time.sleep(1)
        self.assertTrue("Site administration" in driver.title)
        
        self.driver.get("http://127.0.0.1:8000/admin/events/event/")
        time.sleep(1)

        eventLinks = self.driver.find_elements(By.XPATH, "//table[@id='result_list']/tbody/tr/th/a")
        randomEvent = choice(eventLinks)
        randomEvent.click()

        time.sleep(1)
        self.assertTrue(not "AttributeError" in self.driver.title)
        
        # check if the submit button can be clicked:
        submitInput = driver.find_element(By.XPATH, "//input[@value='save']")
        submitInput.click()
        time.sleept(1)

        self.assertTrue("Select event to change" in self.driver.title)

    def tearDown(self):
        # Quit the WebDriver instance
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
