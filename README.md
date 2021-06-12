### About app

Test project with one crud operation generates the statistics according to initial config

### Initial params

![image](https://user-images.githubusercontent.com/37833861/121705304-2f97e900-cadd-11eb-8cc1-cfc6aa060e2d.png)

probability - number between 0 and 1 describes the probability of occurrence of a value; <br>
value - true \ false value that appears with a given probability; <br>
iterations - number, describes how many times generator will be repeated; <br>

### Response

![image](https://user-images.githubusercontent.com/37833861/121705234-1c851900-cadd-11eb-976a-7e646f2e76c1.png)

Gives the result of the function at first execution, how many times we received true \ false according to iterations and what time was needed to execute the function

### Endpoint

https://test-pseudo-random.herokuapp.com/stat

For example, you can use GET request to:
https://test-pseudo-random.herokuapp.com/stat?probability=0.8&value=false&iterations=999999
