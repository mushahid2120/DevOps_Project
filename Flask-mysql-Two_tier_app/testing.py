import pymysql
text="testing!!!!!"

try:
        myconnection=pymysql.connect(host='mydb',user='root',passwd='redhat',database='mysql')

        # result=myconnection.query('create table student(name varchar(20)) ')
        cur=myconnection.cursor()
        cur.execute('CREATE DATABASE IF NOT EXISTS myapp')
        cur.execute('USE myapp')
        if (cur.execute('CREATE TABLE IF NOT EXISTS myapp1 (data VARCHAR(30))')==0):
            print( "database created")
        if (cur.execute('INSERT INTO myapp1 (data) VALUES (%s)', (text,))):
            print(f'query registered {text}')
        myconnection.commit()

except pymysql.MySQLError as err:
        print(err);
