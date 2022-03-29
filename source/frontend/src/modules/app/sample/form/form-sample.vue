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
          maxlength="30"
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
          Mail: <strong>{{ user.email }}</strong>
        </p>
        <p>
          Password: <strong>{{ user.password }}</strong>
        </p>
        <p>
          Satisfaction: <strong>{{ user.satisfaction }}</strong>
        </p>
        <p style="white-space: pre">
          Message: <strong>{{ message }}</strong>
        </p>
        <p>Checkbox Options:</p>
        <ul>
          <li v-for="item in checkboxOptions" :key="item">
            <strong>{{ item }}</strong>
          </li>
        </ul>
        <p>
          Gender: <strong>{{ radioBoxOption }}</strong>
        </p>
        <p>
          Priority: <strong>{{ selectedPriority }}</strong>
        </p>
        <p>
          Switched: <strong>{{ customSwitch }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from "vuex";

export default {
  name: "FormSample",
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
    ...mapMutations("sample", ["setName"]),
    submitted(e) {
      this.isSubmitted = true;
      this.setName(this.user.email);

      e.preventDefault();
    }
  }
};
</script>

<style lang="css">
@import "./form-sample.css";
</style>
