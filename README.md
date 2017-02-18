# github-users
## 1- Installation
to install the project please run the following commands on terminal:
<pre>cd github-users</pre>
<pre>sudo npm install</pre>
<pre>npm start</pre>
now open your browser on port 3000 i.e http://localhost:3000

## 2- Testing
Make sure you have installed karma test runner globally. if not please run the following commands on terminal:
<pre>sudo npm install -g karma-cli </pre>
then run the test :
<pre>karma start </pre>
<pre>karma start --reporters kjhtml  //for visual reports</pre>

## 2- Modifying
Make sure you have installed gulp task runner globally. if not please run the following commands on terminal:
<pre>sudo npm install -g gulp </pre>
then run the following :
<pre>gulp </pre>
now you should be able to edit any files in 'src' directory and gulp will watch and detect any changes and compile the files to the output directory 'dist'.  
