Beacon Event Simulator (BES)
===============================

Introduction
-------------------------------

This is a meteor-based solution in response to the n-iBeacons-m-mobiles simulation problem [here][1].

This basically allows you to simulate the beacon events generated by defining a *Simulation Seed*, which
is a JSON that concisely specifies the encounters of multiple mobiles and beacons.

The generated beacon events will be sent to a firebase server, which is specified by `CONFIG` object in `app/BES.js`.



How to use
--------------------------------
BES allows you to simulate events in two ways:
1. Web interface
2. Command line

###Web interface

1. Edit `app/BES.js` and confirm that the `FIREBASE_URL` in `CONFIG` object is the desired firebase endpoint, to which generated beacon events will be sent

2. Under terminal, cd into `app/BES`

3. Execute `meteor --port=3000`, the BES server will start up and listen to the port 3000 (if it warns about missing packages, use `mrt add [PACKAGE_NAME]` to add the packages and then do this step again. As **windows users** may not be able to use `mrt`, so they will need to download the packages from [here][4], and put the packages into `app/BES/packages`, and then execute `meteor add [PACKAGE_NAME]`)

4. Open a web browser and browse to `http://localhost:3000` 

    (**Warning**: If you use *IE*, please make sure *IE version* >= 10, since the web interface use FileReader API to process your simulation seed, other modern browser should be fine)

5. Through the web interface, upload your simulation seed and you should see generated beacon events in your firebase endpoint right away.

###Command line

1. Edit `app/BES.js` and confirm that the `FIREBASE_URL` in `CONFIG` object is the desired firebase endpoint, to which generated beacon events will be sent

2. Under terminal, cd into `app/BES`

3. Execute `JSON_PATH=[PATH_TO_YOUR_SIMULATION_SEED] meteor --port=3000`, the BES server will start up and process your simulation seed, you should see generated beacon events in your terminal and in your firebase endpoint right away. (Read above if it complains about missing packages)



Format of simulation seed
---------------------------------------
Please refer to the [sample][2]



Running the tests
---------------------------------------
To test BES, do the following:

1. Under terminal, cd into `app/BES/packages`

2. Execute `meteor test-packages beacon-event-generator --port=3000`, the testing server will start up and listen to the port 3000

3. Open a web browser and browse to `http://localhost:3000`, you can see the result of the tests.



Some words on the Pros and Cons
-----------------------------------------
###Pros
1. The concise [syntax][2] of simulation seed helps you avoid enterring repeating information(eg. uuid, major, minor...) for multiple times when defining multiple encounters of multiple mobiles and multiple beacons

2. Given a simulation seed, the beacon events generated can be reproduced 100% (even the **order**)

3. Allow both local usage and remote usage, once you have started up the server, anyone that can access your server can do simulation through the web interface

4. Cross-platform, since the core logic is all in javascript, basically anywhere with nodejs and meteor can run it. *(If you want to run meteor on windows, you may be interested in [this][3])*

5. Lightweight **(< 1 MB)**, assuming you already have installed meteor and nodejs

###Cons
1. One more step to total automation, currently you can purely use terminal to do the whole simulation and send generated beacon events to firebase endpoint, but you still need to press `Ctrl + C` to terminate the meteor server when the simulation is done.

2. The beacon event generation logic is currently modularized as a meteor package, so it can take advantage of *TinyTest*, a meteor testing framework. Since meteor package syntax is not stable yet and is likely to change before *meteor 1.0*, it may need some slight modification later (mainly `package.json`)


[1]: https://github.com/looppulse/simulator "Original coding challenge"
[2]: doc/sample%20json/simulation%20seed/sample_simulation_seed_with_comments(not%20a%20valid%20json).json "Sample simulation seed with comments"
[3]: http://win.meteor.com/ "Running meteor on windows"
[4]: https://atmospherejs.com/ "Good place to download meteor packages"