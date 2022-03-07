<template lang="html">
  <div>
    <h1>Form Sample</h1>
    <form @submit="submitted">
      <div class="form-group">
        <label for="email">Your Email Address</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="user.email"
          minlength="4"
          maxlength="12"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model.lazy="user.password"
          minlength="4"
          maxlength="12"
          required
        />
      </div>
      <div class="form-group">
        <label for="satisfaction"
          >Satisfaction (10 for best, 1 for worst)</label
        >
        <input
          min="1"
          max="10"
          type="number"
          id="satisfaction"
          class="form-control"
          v-model.number="user.satisfaction"
        />
      </div>
      <div class="form-group">
        <label for="message">Your Message</label>
        <textarea
          id="message"
          rows="5"
          class="form-control"
          v-model="message"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="sendspecial">
          <input
            type="checkbox"
            id="sendspecial"
            value="sendSpecial"
            v-model="checkboxOptions"
          />
          I Want Today's Special
        </label>
        <br />
        <label for="sendCoupons">
          <input
            type="checkbox"
            id="sendcoupons"
            value="sendCoupons"
            v-model="checkboxOptions"
          />
          Send Me Monthly Coupons
        </label>
      </div>
      <label for="male">
        <input type="radio" id="male" value="Male" v-model="radioBoxOption" />
        Male
      </label>
      <label for="female">
        <input
          type="radio"
          id="female"
          value="Female"
          v-model="radioBoxOption"
        />
        Female
      </label>
      <label for="priority">Priority</label>
      <select id="priority" class="form-control" v-model="selectedPriority">
        <option v-for="priority in priorities" :key="priority">
          {{ priority }}
        </option>
      </select>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <div class="card" v-if="isSubmitted">
      <div class="card-body">
        <h4 class="card-title">Form Data</h4>
        <p>
          Mail: <b>{{ user.email }}</b>
        </p>
        <p>
          Password: <b>{{ user.password }}</b>
        </p>
        <p>
          Satisfaction: <b>{{ user.satisfaction }}</b>
        </p>
        <p style="white-space: pre">
          Message: <b>{{ message }}</b>
        </p>
        <p>Checkbox Options:</p>
        <ul>
          <li v-for="item in checkboxOptions" :key="item">
            <b>{{ item }}</b>
          </li>
        </ul>
        <p>
          Gender: <b>{{ radioBoxOption }}</b>
        </p>
        <p>
          Priority: <b>{{ selectedPriority }}</b>
        </p>
        <p>
          Switched: <b>{{ customSwitch }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Page1",
  extends: {},
  props: {},
  data: function () {
    return {
      user: {
        email: "",
        password: "",
        satisfaction: ""
      },
      message: "Describe your review...",
      checkboxOptions: [],
      radioBoxOption: "Male",
      selectedPriority: "High",
      priorities: ["High", "Medium", "Low"],
      isSubmitted: false
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    submitted(e) {
      this.isSubmitted = true;
      e.preventDefault();
    }
  }
};
</script>

<style>
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 400px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-top: 10px;
}

btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
