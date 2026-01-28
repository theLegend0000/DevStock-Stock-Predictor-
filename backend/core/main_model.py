import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_percentage_error
import matplotlib.pyplot as plt
import numpy as np
import os 

# Get the absolute path to the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__)) 

def analyze_stock(csv_filename, company_name):
    """
    This function loads a stock CSV, trains a linear regression model,
    and returns prediction data for visualization.
    """
    
    #  1. Load the data 
    file_path = os.path.join(script_dir, csv_filename) 
    
    try:
        df = pd.read_csv(file_path) 
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.") 
        print("Please make sure the CSV file is in the same directory as the script.\n")
        return {} # Exit the function

    # 2. Data Preparation
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.set_index('Date')
    df = df.sort_index() 
    
    # 3. Create Target Variable 
    df['Target'] = df['Close'].shift(-1)

    # 4. Feature Engineering 
    df['MA_7'] = df['Close'].rolling(window=7).mean()
    df['MA_30'] = df['Close'].rolling(window=30).mean()
    df['Std_7'] = df['Close'].rolling(window=7).std()
    df['Range'] = df['High'] - df['Low']
    
    df = df.dropna()

    # 5. Define Features (X) and Target (y) 
    features_list = ['Open', 'High', 'Low', 'Close', 'Volume', 'MA_7', 'MA_30', 'Std_7', 'Range']
    X = df[features_list]
    y = df['Target']

    #  6. Chronological Data Split (80% Train, 20% Test), (80% is used to train and the remaining 20% is used to test the data)
    split_percentage = 0.8
    split_index = int(len(df) * split_percentage)

    X_train = X[:split_index]
    y_train = y[:split_index]
    X_test = X[split_index:]
    y_test = y[split_index:]

    if len(X_test) == 0:
        print(f"Error: Not enough data for {company_name} to create a test set. Need more data.")
        return {}

    #  7. Train the Model ---
    model = LinearRegression()
    model.fit(X_train, y_train)

    # 8. Analyze the Model's Formula ---
    intercept = model.intercept_ #intercept of the formula
    coefficients = model.coef_
    coeff_df = pd.DataFrame(coefficients, index=features_list, columns=['Coefficient']) #coefficients i.e; m values 
    
    print(f"\n--- Model Results for {company_name} ---")
    print(f"The intercept (b) is: {intercept:.4f}")
    print("\nModel Coefficients (Formula):")
    print(coeff_df)

    # 9. Evaluate the Model ---
    y_pred = model.predict(X_test)
    
    mse = mean_squared_error(y_test, y_pred) 
    rmse = np.sqrt(mse) #absolute error in dollors
    r2 = r2_score(y_test, y_pred) 
    mape = mean_absolute_percentage_error(y_test, y_pred) 

    print("\nModel Performance on Test Set:")
    print(f"Test RMSE (Average $ Error): ${rmse:.2f}")
    print(f"Test MAPE (Average % Error): {mape:.2%}") 
    print(f"Test R-squared (Model Fit): {r2:.4f}")

    # 10. Return data for visualization instead of plotting
    dates = [date.strftime('%Y-%m-%d') for date in y_test.index]
    actual_prices = y_test.values.tolist()
    predicted_prices = y_pred.tolist()
    
    return {
        'company': company_name,
        'dates': dates,
        'actual_prices': actual_prices,
        'predicted_prices': predicted_prices,
        'rmse': float(rmse),
        'mape': float(mape),
        'r2': float(r2)
    }
def main_menu():
    """
    This function runs the main user menu.
    """
    while True:
        print("\n--- Stock Prediction Model Menu ---")
        print("Which company would you like to analyze?")
        print("  1: Tesla (TSLA.csv)")
        print("  2: Amazon (Amazon.csv)")
        print("  3: Google (GOOGL.CSV)")
        print("  4: Facebook (Facebook.csv)")
        print("  5: Netflix (Netflix.csv)")
        print("  6: Apple (Apple.csv)")
        print("  q: Quit")
        
        choice = input("Enter your choice (1, 2, 3, 4, 5, 6 or q): ").strip().lower()
        
        if choice == '1':
            analyze_stock(csv_filename='TSLA.csv', company_name='Tesla')
        
        elif choice == '2':
            analyze_stock(csv_filename='Amazon.csv', company_name='Amazon')
            
        elif choice=='3':
            analyze_stock(csv_filename='GOOGL.csv', company_name='Google')

        elif choice == '4':
            analyze_stock(csv_filename='Facebook.xls', company_name='Facebook')

        elif choice == '5':
            analyze_stock(csv_filename='Netflix.xls', company_name='Netflix')

        elif choice == '6':
            analyze_stock(csv_filename='Apple.xls', company_name='Apple')

        elif choice == 'q':
            print("Exiting program. Goodbye!")
            break # Exit the while loop
            
        else:
            print("Invalid choice. Please enter 1, 2, 3, 4, 5, 6 or q.")

if __name__ == "__main__":
    main_menu()