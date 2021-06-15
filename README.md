### About app

Test project with one crud operation generates the statistics according to initial config

### How to install
git clone https://github.com/dromix/pseudo-random.git  
npm i && npm run dev

### Initial params

![image](https://user-images.githubusercontent.com/37833861/122102757-727bf880-ce1e-11eb-9829-49fe193e499c.png)

probability - number between 0 and 1 describes the probability of occurrence of a value; <br>
value - true \ false value that appears with a given probability; <br>
iterations - number, describes how many times generator will be repeated; <br>

### Response

![image](https://user-images.githubusercontent.com/37833861/121705234-1c851900-cadd-11eb-976a-7e646f2e76c1.png)

Gives the result of the function at first execution, how many times we received true \ false according to iterations and what time was needed to execute the function

### Endpoint

POST https://test-pseudo-random.herokuapp.com/stat 

body {  
    "probability": 0.5,  
    "value": true,  
    "iterations": 1000  
}


