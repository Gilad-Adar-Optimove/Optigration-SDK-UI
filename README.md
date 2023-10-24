# Introduction 
This is a tool is an implementation of the optigration SDK.\
it allows you to view your Optimove optigration campaigns' data.


# Getting Started
Run npm i\
Run npm start\
open your broswer: http://localhost:4000/

# How to use
Put your webhook payload in the JSON Input section and then click "Init SDK"\
The status should change from "not initialized" to "initialized"\
Now, you can click on the "Get metadata" button.\
On the response you have the attreibute: "numberOfFiles". each file is a batch id\
for example, if you got numberOfFiles: 3, it means you have 3 cuistomers batches.\
You can now put a batch id in the batch index section to get the batch customers data.