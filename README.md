# MVC_App

	• Concept
		○ User can use app to track anxiety episodes and help change thoughts
		
	• MVP
		○ User can view log of anxiety episodes
		○ User can add anxiety episode with details
		○ User can edit anxiety episode
		○ User can delete anxiety episode
	• Stretch
		○ Graph anxiety rating
		○ App will determine trends such as 
			§ most common type of thinking errors
			§ most common triggers
			§ days of week with highest/lowest anxiety
		○ User login
		○ Public/private
    
    Matt's Recap:
MVP
- Full CRUD on Anxiety Episode
Stretch
- Graphing anxiety rating
- Trend tracking
- Users and sessions

Name	Path	HTTP Verb	Purpose
Index	/anxietytracker	GET	List all anxiety episodes
New	/anxietytracker/new	GET	Show new anxiety episode form
Add	/anxietytracker	POST	Create a new anxiety episode, then redirect to show page (or index page)
Show	/anxietytracker/:id	GET	Show details about one specific anxiety expisode
Edit	/anxietytracker/:id:edit	GET	Show edit form for one specific anxiety episode
Update	/anxietytracker/:id	PUT	Update an anxiety episode, then redirect to that show page (or index page)
Delete	/anxietytracker/:id	DELETE	Delete a particular anxiety episode, then redirect to index page

![image](https://user-images.githubusercontent.com/37551471/112231731-46791e80-8c05-11eb-9729-764345544d27.png)


![image](https://user-images.githubusercontent.com/37551471/112231703-36f9d580-8c05-11eb-9d5b-f1b77921c344.png)

    
![image](https://user-images.githubusercontent.com/37551471/112231596-0023bf80-8c05-11eb-9231-2f3e8f440493.png)





