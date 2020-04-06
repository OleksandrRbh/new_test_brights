<template>
  <div class="v-form">    

    <div class="v-wrapper" v-for="(step, stepindex) of form_configuration" :key="stepindex">
      <div class="v-step"
        v-if="isVisibleStep[stepindex] === true"
      >
        <div class="v-field"
          v-for="(field, subindex) of step"
          :key="subindex"
        >
          <label>
            <span v-if="field.labelBefore">{{ field.labelBefore }}</span>
            <input
              v-if="field.element === 'input'"
              v-model="$v.form_data[`step${stepindex}`][field.name].$model"
              :type="field.type"
              :name="field.name"
              :placeholder="field.placeholder"
              :class="`v-field__${field.type}`"
            >

            <select
              v-if="field.element === 'select'"
              v-model="$v.form_data[`step${stepindex}`][field.name].$model"
              :type="field.type"
              :name="field.name"
              :class="`v-field__${field.type}`"
            >
              <option 
                v-for="(option, optindex) of field.options" 
                :key="optindex"
                :value="option.value" 
                :selected="option.selected"               
              >
                {{ option.text }}
              </option>
            </select>
            <span v-if="field.labelAfter">{{ field.labelAfter }}</span>
          </label>

          <div
              v-if="field.element === 'radiofield'"
              :class="`v-field__${field.type}`"
            >            
            <label 
              v-for="(input, radioindex) of field.inputs" 
              :key="radioindex"
            >
              <input                 
                :type="field.type"
                :name="field.name"
                :value="input.value"
                :checked="input.checked"
                v-model='$v.form_data[`step${stepindex}`][field.name].$model'
              >
              <span>{{ input.text }}</span>
            </label>            
          </div>
          <p 
            v-if="field.element === 'input'"
            class="form__error"
          >
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.required && !$v.form_data[`step${stepindex}`][field.name].required && $v.form_data[`step${stepindex}`][field.name].$dirty'>*This field is required.</span>
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.email && !$v.form_data[`step${stepindex}`][field.name].email && $v.form_data[`step${stepindex}`][field.name].$dirty'>* Email is not correct.</span>  
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.minLength && !$v.form_data[`step${stepindex}`][field.name].minLength && $v.form_data[`step${stepindex}`][field.name].$dirty'>*This field must be at least {{ $v.form_data[`step${stepindex}`][field.name].$params.minLength.min }} characters</span>  
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.maxLength && !$v.form_data[`step${stepindex}`][field.name].maxLength && $v.form_data[`step${stepindex}`][field.name].$dirty'>*This field must be at least {{ $v.form_data[`step${stepindex}`][field.name].$params.maxLength.max }} characters</span>
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.minValue && !$v.form_data[`step${stepindex}`][field.name].minValue && $v.form_data[`step${stepindex}`][field.name].$dirty'>*This number must be at least {{ $v.form_data[`step${stepindex}`][field.name].$params.minValue.min }}</span>  
            <span v-if='$v.form_data[`step${stepindex}`][field.name].$params.maxValue && !$v.form_data[`step${stepindex}`][field.name].maxValue && $v.form_data[`step${stepindex}`][field.name].$dirty'>*This number must be at least {{ $v.form_data[`step${stepindex}`][field.name].$params.maxValue.max }}</span>          
          </p>
          <button
            v-if="field.element === 'button'"
            :type="field.type"
            :class="`v-field__${field.type}`"
            @click="clickButton(field, stepindex)"
          >
            {{ field.innerText }}
          </button>

        </div>
      </div>  
    </div>

  </div>
</template>

<script>
import { form_configuration, form_data } from '../formConfig'

export default {
  name: 'v-form', 
  components: {},   
  props: {},
  data() {
    return {      
      isVisibleStep: [ true, false, false ],
      form_data: {
        step0: {
          firstname: '',
          lastname: '',
          email: '',
          age: '',
        },
        step1: {
          salary: '',
          isWorkRemotely: false,
          isWorkFulltime: false, 
          lookingPosition: ''         
        },
        step2: {          
          experienceFront: '',
          experienceVue: '',
        },
      },      
      form_configuration,
      stepData: {},
      currentIndex: 0,
    }
  },
  mounted() {
    console.log(this.$v);
  },
  validations: {
    form_data 
  },
  computed: {},
  methods: {
    clickButton(field, stepindex) {
      if (field.clickEvent === 'submitForm') {
        if (this.$v.form_data[`step${stepindex}`].$invalid) {
          this.$v.form_data[`step${stepindex}`].$touch()
          return
        }
        alert('FORM SUBMITED');
      } else if (field.clickEvent === 'goToNextStep') {

        if (this.$v.form_data[`step${stepindex}`].$invalid) {
          this.$v.form_data[`step${stepindex}`].$touch()
          return
        }
        this.currentIndex = this.isVisibleStep.indexOf(true);        
        if (this.currentIndex < this.isVisibleStep.length-1) {
          this.isVisibleStep[this.currentIndex+1] = true;
          this.isVisibleStep[this.currentIndex] = false;
        }        
        this.$forceUpdate();      
      } else if (field.clickEvent === 'goToPrevStep') {
        this.currentIndex = this.isVisibleStep.indexOf(true);        
        if (this.currentIndex > 0) {
          this.isVisibleStep[this.currentIndex-1] = true;
          this.isVisibleStep[this.currentIndex] = false;
        }        
        this.$forceUpdate();       
      }
    },    
  }
}
</script>

<style lang="scss">
  .v-form {
    max-width: 856px;
    margin: 0 auto;
    padding: 65px 40px 30px;
    box-sizing: border-box;
    background: #F6F8F7;

    .v-field {
      margin-bottom: 20px;

    }

    .v-field__text, .v-field__number, .v-field__select {
      outline: none;
      background: #fbfbfb;
      border: 1px solid #cacaca;
      font-size: 14px;
      padding: 8px;
      display: block;
      margin: 15 0 0 0;
      height: 40px;    
      box-sizing: border-box;
      min-width: 300px;    
    }

    .v-field__radio {
      padding: 15px 0 15px;
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 10px ;
      }
    }

    .form__error {
      margin-top: 5px;
      color: #ff4040;
      font-size: 12px;
    }

    .v-field__button {              
      padding: 13px 22px;
      border: none;
      color: #ffffff;
      background-color: #000000;

      &:hover {
        background-color: #202020;
      }
    }

  }
</style>