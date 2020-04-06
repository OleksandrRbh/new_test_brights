import { required, email, minLength, maxLength, minValue, maxValue, numeric } from 'vuelidate/lib/validators'

const form_configuration = [   //  вся форма 
  [  //  степ1
    {   //  элемент      
      "element": "input",
      "type": "text",
      "name": "firstname",
      "placeholder": "Enter your firstname",                       
    },
    {   //  элемент
      "element": "input",
      "type": "text",
      "name": "lastname",
      "placeholder": "Enter your lastname",
    },
    {   //  элемент
      "element": "input",
      "type": "number",
      "name": "age",
      "placeholder": "Enter your age",
    },
    {   //  элемент
      "element": "input",
      "type": "text",
      "name": "email",
      "placeholder": "Enter your email",
    },
    {   //  элемент кнопка
      "element": "button",
      "type": "button",           
      "innerText": "NEXT STEP",
      "clickEvent": "goToNextStep"
    },                  
  ],
  [  //  степ2
    {   //  элемент
      "element": "input",
      "type": "number",
      "name": "salary",
      "placeholder": "Expected salary (USD)",
    },
    {   //  элемент            
      "element": "input",
      "type": "checkbox",
      "name": "isWorkRemotely",
      "labelAfter": "Can you work remotely?",            
    },
    {   //  элемент            
      "element": "input",
      "type": "checkbox",
      "name": "isWorkFulltime",
      "labelAfter": "Can you work fulltime?",            
    }, 
    {   //  элемент
      "element": "select",
      "type": "select",
      "name": "lookingPosition",
      "labelBefore": "Looking position",
      "options": [
        { "value": "frontend", "text": "Frontend" },
        { "value": "backend", "text": "Backend", "selected": true }
      ]       
    },  
    {   //  элемент кнопка
      "element": "button",
      "type": "button",           
      "innerText": "PREV STEP",
      "clickEvent": "goToPrevStep"
    },
    {   //  элемент кнопка
      "element": "button",
      "type": "button",           
      "innerText": "NEXT STEP",
      "clickEvent": "goToNextStep"
    },                 
  ],
  [  //  степ3    
    {   //  элемент
      "element": "radiofield",
      "type": "radio",
      "name": "experienceFront",
      "labelBefore": "Total experience in Frontend Development",
      "inputs": [
        { "value": "no", "text": "No experience", "checked": true },
        { "value": "1year", "text": "1 Year" },
        { "value": "1-3_years", "text": "1-3 Years" },
        { "value": "3+_years", "text": "3+ Years" },
      ]
    },
    {   //  элемент
      "element": "radiofield",
      "type": "radio",
      "name": "experienceVue",
      "labelBefore": "Total experience in Vue.js",
      "inputs": [
        { "value": "no", "text": "No experience", "checked": true },
        { "value": "1year", "text": "1 Year" },
        { "value": "1-3_years", "text": "1-3 Years" },
        { "value": "3+_years", "text": "3+ Years" },
      ]
    },
    {   //  элемент кнопка
      "element": "button",
      "type": "button",           
      "innerText": "PREV STEP",
      "clickEvent": "goToPrevStep"
    },
    {   //  элемент кнопка
      "element": "button",
      "type": "button",           
      "innerText": "SUBMIT FORM",
      "clickEvent": "submitForm"
    }, 
  ],
]

const form_data = {
  step0: {
    firstname: { required, minLength: minLength(3), maxLength: maxLength(18), },
    lastname: { required, minLength: minLength(3), maxLength: maxLength(18), },
    age: { required, numeric, minValue: minValue(18), maxValue: maxValue(60) },
    email: { required, email },
  },
  step1:{
    salary: { required, numeric, minValue: minValue(100), maxValue: maxValue(5000) },
    isWorkRemotely: {  },
    isWorkFulltime: {  },
    lookingPosition: {  }
  },
  step2:{    
    experienceFront: {  },
    experienceVue: {  },
  }
};

export { form_configuration, form_data }