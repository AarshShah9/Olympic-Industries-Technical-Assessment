import pandas as pd
import sqlite3
import numpy as np

# Convert into CSV
read_file = pd.read_excel("backend/db/LumberFut.xlsx")
read_file.to_csv("backend/db/LumberFut.csv", index=None, header=True)
df = pd.read_csv('backend/db/LumberFut.csv')

# Set up df to be used in SQL


df.columns = df.columns.str.strip()  # cleans dataset
df.replace('-', np.NAN, inplace=True)  # replaces empty cells with NaN
df.dropna()  # drops NaN


df['Date'] = df['Date'].astype(str)  # converts date to string
df['Open'] = df['Open'].astype(float)  # converts open to float
df['High'] = df['High'].astype(float)  # converts high to float
df['Low'] = df['Low'].astype(float)  # converts low to float
df['Close*'] = df['Close*'].astype(float)  # converts close to float
df['Adj Close**'] = df['Adj Close**'].astype(float)
df['Volume'] = df['Volume'].astype(float)  # converts volume to int

df = df.loc[::-1]  # reverses the order of the dataframe

db_connection = sqlite3.connect('backend/db/lumber.sqlite3')
c = db_connection.cursor()
df.to_sql('LumberStockData', db_connection, if_exists='replace', index=False)

db_connection.close()
