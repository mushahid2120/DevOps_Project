
from flask import Flask,redirect,render_template,request
import pymysql

app=Flask(__name__)

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/')
def hom():
    return redirect('/home')

@app.route('/submit',methods=['POST'])
def submit():
    text=request.form.get('data')
    print(f"Received text: {text}")
    db(text)
    return redirect('/home')



def db(text):
    print(text)
    try:
        myconnection=pymysql.connect(host='localhost',user='root',passwd='7779979461',database='mysql')
    
        # result=myconnection.query('create table student(name varchar(20)) ')
        cur=myconnection.cursor()
        cur.execute('CREATE DATABASE IF NOT EXISTS myapp')
        cur.execute('USE myapp')
        if (cur.execute('CREATE TABLE IF NOT EXISTS myapp1 (data VARCHAR(30))')==0):
            print( "database created")
        if (cur.execute('INSERT INTO myapp1 (data) VALUES (%s)', (text,))):
            print(f'query registered {text}')
        myconnection.commit()
        # cur.execute('select * from myfirst1')
        # table = cur.fetchall()
        # for line in table:
        #     print(line)
        # # myconnection.query()
       

    except pymysql.MySQLError as err:
        print(err); 




app.run(port=80)
