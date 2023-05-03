from flask import Flask, request, jsonify
import pymongo
from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
from joblib import load 
import pandas as pd 
import numpy as np
from datetime import datetime
import datetime as dt
import calendar
import time
user=''
air_up={}
air_down={}
hotel={}
destcity=''
srccity=''
sd=''
food={}
ed=''
app = Flask(__name__)
userestimate={}
pred={}
air=''
model = load(r'D:\flproject\backend\random_forest.joblib')
@app.route('/set_air', methods=['POST','GET'])
def set_air():
        global destcity
        global sd
        global ed
        global air
        global srccity
        status='False'
        src = request.form['src']
        srccity=src
        dest = request.form['dest']
        destcity=dest
        airlines= request.form['airlines']
        air=airlines
        departure=request.form['departure']
        sd=request.form['sd']
        ed=request.form['ed']
        dto=datetime.strptime(sd,"%Y-%m-%d")
        cdt=datetime.today().strftime('%Y-%m-%d')
        cdo=datetime.strptime(cdt,"%Y-%m-%d")
        tdelta=dto-cdo
        no_of_days=tdelta.days
        stops=1
        global air_up
        air_up={'stops':[stops],'days_left':[no_of_days], 'airline_AirAsia':[0], 'airline_Air_India':[0],
       'airline_GO_FIRST':[0], 'airline_Indigo':[0], 'airline_SpiceJet':[0],
       'airline_Vistara':[0], 'source_city_Bangalore':[0], 'source_city_Chennai':[0],
       'source_city_Delhi':[0], 'source_city_Hyderabad':[0], 'source_city_Kolkata':[0],
       'source_city_Mumbai':[0], 'class_Business':[0], 'class_Economy':[1],
       'departure_time_Afternoon':[0], 'departure_time_Early_Morning':[0],
       'departure_time_Evening':[0], 'departure_time_Late_Night':[0],
       'departure_time_Morning':[0], 'departure_time_Night':[0],
       'destination_city_Bangalore':[0], 'destination_city_Chennai':[0],
       'destination_city_Delhi':[0], 'destination_city_Hyderabad':[0],
       'destination_city_Kolkata':[0], 'destination_city_Mumbai':[0]}
        global air_down
        air_down={'stops':[stops],'days_left':[no_of_days], 'airline_AirAsia':[0], 'airline_Air_India':[0],
       'airline_GO_FIRST':[0], 'airline_Indigo':[0], 'airline_SpiceJet':[0],
       'airline_Vistara':[0], 'source_city_Bangalore':[0], 'source_city_Chennai':[0],
       'source_city_Delhi':[0], 'source_city_Hyderabad':[0], 'source_city_Kolkata':[0],
       'source_city_Mumbai':[0], 'class_Business':[0], 'class_Economy':[1],
       'departure_time_Afternoon':[0], 'departure_time_Early_Morning':[0],
       'departure_time_Evening':[0], 'departure_time_Late_Night':[0],
       'departure_time_Morning':[0], 'departure_time_Night':[0],
       'destination_city_Bangalore':[0], 'destination_city_Chennai':[0],
       'destination_city_Delhi':[0], 'destination_city_Hyderabad':[0],
       'destination_city_Kolkata':[0], 'destination_city_Mumbai':[0]}
        air_up["airline_"+airlines]=[1]
        air_up["source_city_"+src]=[1]
        air_up["destination_city_"+dest]=[1]
        air_up["departure_time_"+departure]=[1]
        
        
        air_down["source_city_"+src]=[0]
        air_down["destination_city_"+dest]=[0]
        air_down["source_city_"+dest]=[1]
        air_down["destination_city_"+src]=[1]
        dto=datetime.strptime(ed,"%Y-%m-%d")
        cdt=datetime.today().strftime('%Y-%m-%d')
        cdo=datetime.strptime(cdt,"%Y-%m-%d")
        tdelta=dto-cdo
        no_of_days=tdelta.days
        air_down['days_left']=[no_of_days]
        status='True'
        return {'status': status}
@app.route('/set_hotel', methods=['POST','GET'])
def set_hotel():
     
     status='False'
     breakfast=request.form['breakfast']
     rating=request.form['rating']
     wifi=request.form['wifi']
     rating=float(rating)
     global hotel
     hotel={"IsWeekend":[0],'StarRating':[rating],'FreeWifi':[0],'FreeBreakfast':[0],'HotelCapacity':[86.39],'CityName_Bangalore':[0],'CityName_Chennai':[0],'CityName_Kolkata':[0],'CityName_Delhi':[0],'CityName_Hyderabad':[0],'CityName_Mumbai':[0]}
     hotel['CityName_'+destcity]=[1]
     delta=dt.timedelta(days=1)
     st=datetime.strptime(sd,"%Y-%m-%d")
     edate=datetime.strptime(ed,"%Y-%m-%d")
     while(st<=edate):
          if(st.weekday()==5 or st.weekday()==6):
               hotel['IsWeekend']=[1]
               break
          st+=delta
     if (wifi=="Yes"):
        hotel['FreeWifi']=[1]
     if(breakfast=="Yes"):
        hotel["FreeBreakfast"]=[1]

     status='True'
    
     return {'status':status}

     
@app.route('/set_food', methods=['POST','GET'])
def set_food():
     status='False'
     cus=request.form['cuisine']
     rating=request.form['rating']
     global food
     food={'Price range':[],'City_Bangalore':[0],'City_Chennai':[0],'City_Hyderabad':[0],'City_Kolkata':[0],'City_Mumbai':[0],
               'City_New Delhi':[0],'Cuisines_North Indian':[0],'Cuisines_Others':[0],'Cuisines_South Indian':[0],
               'Rating text_Average':[0],'Rating text_Excellent':[0],'Rating text_Good':[0],'Rating text_Poor':[0],'Rating text_Very Good':[0],
               }
     global destcity
     if destcity=='Delhi':
          destcity='New Delhi'
     food['City_'+destcity]=[1]
     food['Rating text_'+rating]=[1]
     food['Price range']=[3]
     status='True'

   
     return {'status':status}

@app.route('/estimator', methods=['POST','GET'])
def estimator():
     afu=request.form['airfareup']
     afd=request.form['airfaredown']
     hotels=request.form['hotel']
     foods=request.form['food']
     misc=request.form['misc']
     global userestimate
     global user
     gm=time.gmtime()
     id=calendar.timegm(gm)
     userestimate={'useranme':user,'afu':afu,'afd':afd,'hotel':hotels,'food':foods,'misc':misc,'ids':str(id)}
     print(userestimate)
     airmodel=load(r"D:\reactmat\backend\random_forest.joblib")
     hotelmodel=load(r"D:\reactmat\backend\Hotel_Cost_prediction.joblib")
     foodmodel=load(r"D:\reactmat\backend\Food_Fare_Prediction.joblib")
     global air_up
     global air_down
     global hotel
     global food
     audf=pd.DataFrame(air_up)
     addf=pd.DataFrame(air_down)
     hoteldf=pd.DataFrame(hotel)
     fooddf=pd.DataFrame(food)
     aup=airmodel.predict(audf)
     adp=airmodel.predict(addf)
     hotp=hotelmodel.predict(hoteldf)
     foodp=foodmodel.predict(fooddf)
     print("PREDICTIONS",aup,adp,hotp,foodp)
     global pred
     pred={'airup':str(int(aup[0])),'airdownp':str(int(adp[0])),'foodp':str(int(foodp[0])),'hotelp':str(int(hotp[0])),'miscp':'1000'}
     pred.update(userestimate)
     pred.update({'src':srccity,'dest':destcity,'airline':air,'start':sd,'end':ed,'approval':'pending'})
     print(pred)
     myclient = pymongo.MongoClient("mongodb://localhost:27017/")
     mydb = myclient["TripEstimator"]
     mycol = mydb["Requests"]
     x=mycol.insert_one(pred)
     pred.update({'status':'True'})
     return {'status':'True','airup':str(afu),'airupp':str(pred['airup']),'airdown':str(afd),'airdownp':str(pred['airdownp']),'hotel':str(hotels),'hotelp':str(pred['hotelp']),'food':str(foods),'foodp':str(pred['foodp']),'misc':str(misc),'miscp':str(pred['miscp'])}


     
@app.route('/validate_password',methods=['POST','GET'])
def validate_password():
    username=request.form["setUsername"]
    password=request.form["setPass"]
    #print(username,password)
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["TripEstimator"]
    mycol = mydb["UserData"]
    useFlag='False'
    pasFlag='False'
    adminFlag='False'
    global user
    user=username
    for x in mycol.find():
        if(x['username']==username and x['password']==password):
            useFlag='True'
            pasFlag='True'
            print("Login Success")
            if(username=='admin'):
                adminFlag='True'
        elif(x['username']==username and x['password']!=password):
            useFlag='True'
            print("Password Incorrect")
           
        
    
    return {'UsernameFlag':useFlag,"PasswordFlag":pasFlag,"UserName":username,"adminFlag":adminFlag}
@app.route('/add_user',methods=['POST','GET'])
def add_user():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["TripEstimator"]
    mycol = mydb["UserData"]
    username=request.form['Username']
    password=request.form['Pass']
    mob=request.form['mobile']
    usef='False'
    ins='False'
    for x in mycol.find():
         if(x['username']==username and x['mobile']==mob):
              usef='True'
              break
    if(usef=='False'):
         data={'username':username,'password':password,'mobile':mob}
         x=mycol.insert_one(data)
         ins='True'
    return {'Found':usef,'Inserted':ins}
@app.route('/return_hist',methods=['POST','GET'])
def return_hist():
     d=dict()
     n=request.form['name']
     myclient = pymongo.MongoClient("mongodb://localhost:27017/")
     mydb = myclient["TripEstimator"]
     mycol = mydb["Requests"]
     l=[]
     see=[]
     for doc in mycol.find():
          if (doc['ids'] not in see):
               if(doc['useranme']==n):
                    di={'id':doc['ids'],'src':doc['src'],'dest':doc['dest'],'sd':doc['start'],'ed':doc['end'],'airline':doc['airline'],'status':doc['approval']}
                    l.append(di)
                    see.append(doc['ids'])
     d['res']=l
     return d
@app.route('/adminlist',methods=['POST','GET'])
def adminlist():
     d=dict()
     n=request.form['name']
     myclient = pymongo.MongoClient("mongodb://localhost:27017/")
     mydb = myclient["TripEstimator"]
     mycol = mydb["Requests"]
     l=[]
     see=[]
     for doc in mycol.find():
          if (doc['ids'] not in see):
               if(doc['useranme']!='' and doc['approval']=='pending'):
                    del doc['_id']
                    l.append(doc)
                    see.append(doc['ids'])
     d['res']=l
     return d
@app.route('/approve',methods=['POST','GET'])
def approve():
     d=dict()
     idu=int(request.form['id'])
     myclient = pymongo.MongoClient("mongodb://localhost:27017/")
     mydb = myclient["TripEstimator"]
     mycol = mydb["Requests"]
     query={"ids":idu}
     new={"$set":{"approval":"approved"}}
     mycol.update_one(query,new)
     return {'status':'True'}

    
if __name__ == '__main__':
    app.run(debug='True',port=5000)
