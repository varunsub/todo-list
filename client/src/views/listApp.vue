<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
        <appsidebar icon="mdi-star" title="ToDo" />
        <appsidebar
          icon="mdi-plus"
          title="Add Task"
          @click.native="dialog = !dialog"
        />
        <!-- <a :href="`mailto:varun.subramanyan@gmail.com`">
          <appsidebar icon="mdi-message" title="Contact Us" />
        </a>
        <appsidebar icon="mdi-help-circle" title="Help" /> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  class="ml-0 toolbar pl-4"></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <!-- <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template> -->
        <!-- <v-list>
          <v-list-item v-for="item in notifications1" :key="item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>-->
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text large title v-on="on">My ToDo</v-btn>
        </template>
        <v-list>
          <v-btn width="100%" text @click="logout">Log out</v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content fluid class="text-left">
      <v-col sm="12" class="pl-6">
        <h4 class="pa-5 pb-5 headline " fixed>ToDo</h4>
        <v-divider :inset="inset" />
        <v-list class="pa-0" :key="reload">
          <div v-for="(event, index) in notCompleted" :key="index">
            <v-list-item
              class="py-2"
              @click="update(index)"
              v-if="!notCompleted[index].completed"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="event.completed"
                  @click.native="updateEvents(event)"
                />
              </v-list-item-action>
              <v-list-item-content class="ml-6">
                <v-list-item-title>{{
                  notCompleted[index].taskName
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider :inset="inset" v-if="!event.completed" />
          </div>
        </v-list>
      </v-col>
    </v-content>

    <v-dialog v-model="details" width="800px">
      <v-card>
        <v-card-title class="light-blue">Edit Task</v-card-title>
        <v-row class="pl-2 pr-2" no-gutters>
          <v-col sm="6">
            <v-text-field
              autofocus
              v-model="notCompleted[updateIndex].taskName"
              class="ml-4"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-model="notCompleted[updateIndex].deadlineTime"
              class="ml-6"
              type="time"
              suffix="PST"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" class="ml-6">
            <v-menu
              v-model="fromDateMenu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Deadline"
                  prepend-icon="event"
                  v-model="notCompleted[updateIndex].deadlineDate"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                :min="today"
                locale="en-in"
                v-model="notCompleted[updateIndex].deadlineDate"
                no-title
                @input="fromDateMenu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row
          class="ml-4"
          v-if="notCompleted[updateIndex].notification1.filled != false"
        >
          <v-col sm="4">
            <v-select
              v-model="notCompleted[updateIndex].notification1.type"
              :items="notificationType"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-text-field
              v-model="notCompleted[updateIndex].notification1.length"
              single-line
              type="number"
            />
          </v-col>
          <v-col sm="3">
            <v-select
              v-model="notCompleted[updateIndex].notification1.unit"
              :items="notificationUnit"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-icon
              class="mt-6"
              @click="notCompleted[updateIndex].notification1.filled = false"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
        <v-row
          class="ml-4"
          v-if="notCompleted[updateIndex].notification2.filled != false"
        >
          <v-col sm="4">
            <v-select
              v-model="notCompleted[updateIndex].notification2.type"
              :items="notificationType"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-text-field
              v-model="notCompleted[updateIndex].notification2.length"
              single-line
              type="number"
            />
          </v-col>
          <v-col sm="3">
            <v-select
              v-model="notCompleted[updateIndex].notification2.unit"
              :items="notificationUnit"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-icon
              class="mt-6"
              @click="notCompleted[updateIndex].notification2.filled = false"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
        <v-row
          class="ml-4"
          v-if="
            !(
              notCompleted[updateIndex].notification1.filled &&
              notCompleted[updateIndex].notification2.filled
            )
          "
        >
          <v-icon>mdi-bell</v-icon>
          <v-btn text @click="updateNotification">Add notification</v-btn>
          <v-menu text></v-menu>
        </v-row>
        <v-card-actions>
          <v-alert
            dismissible
            v-model="snackbar.active"
            color="red"
            outlined
            class="ml-2 pa-2 mh-5"
            :timeout="false"
          >
            {{ snackbar.message }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="details = !details">Cancel</v-btn>
          <v-btn text @click="saveUpdate">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn bottom color="blue" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" @keydown.esc="dialog = false" width="800px">
      <v-card>
        <v-card-title class="light-blue">Add Task</v-card-title>

        <v-row class="pl-2 pr-2" no-gutters>
          <v-col sm="6">
            <v-text-field
              autofocus
              label="Task"
              v-model="taskName"
              class="ml-4"
              placeholder="Pick up groceries"
            ></v-text-field>
          </v-col>
          <v-col md="2">
            <v-text-field
              label="Time"
              v-model="timeEntered"
              class="ml-6"
              type="time"
              suffix="PST"
            ></v-text-field>
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="2" class="ml-6">
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Deadline"
                  prepend-icon="event"
                  v-model="fromDateVal"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                :min="today"
                locale="en-in"
                v-model="fromDateVal"
                no-title
                @input="fromDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col sm="1" />
        </v-row>
        <v-row class="ml-4" v-if="notifications[0].filled">
          <v-col sm="4">
            <v-select
              v-model="notifications[0].type"
              :items="notificationType"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-text-field
              v-model="notifications[0].length"
              single-line
              type="number"
            />
          </v-col>
          <v-col sm="3">
            <v-select
              v-model="notifications[0].unit"
              :items="notificationUnit"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-icon class="mt-6" @click="notifications[0].filled = false"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
        <v-row class="ml-4" v-if="notifications[1].filled">
          <v-col sm="4">
            <v-select
              v-model="notifications[1].type"
              :items="notificationType"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-text-field
              v-model="notifications[1].length"
              single-line
              type="number"
            />
          </v-col>
          <v-col sm="3">
            <v-select
              v-model="notifications[1].unit"
              :items="notificationUnit"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-icon class="mt-6" @click="notifications[1].filled = false"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
        <v-row
          class="ml-4"
          v-if="!(notifications[0].filled && notifications[1].filled)"
        >
          <v-icon>mdi-bell</v-icon>
          <v-btn text @click="addNotification">Add notification</v-btn>
          <v-menu text></v-menu>
        </v-row>
        <v-card-actions>
          <v-alert
            dismissible
            v-model="snackbar.active"
            color="red"
            outlined
            class="ml-2 pa-2 mh-5"
            :timeout="false"
          >
            {{ snackbar.message }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="validate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import appsidebar from "../components/appsidebar";
import addItem from "../services/addItem";
import getList from "../services/getList";
import logoutService from "../services/logoutService";
import completedService from "../services/completedService";
import updateService from "../services/updateService";

//Developer console vue warnings are due to a bug, see below
//https://github.com/hejianxian/vddl/issues/23

export default {
  name: "listApp",
  components: {
    appsidebar: appsidebar
  },
  props: {
    source: String
  },
  data: () => ({
    editTime: "",
    icon: "",
    text: "",
    dialog: false,
    drawer: true,
    today: new Date().toISOString().substr(0, 10),
    timeNow: new Date().getHours() + ":" + new Date().getMinutes(),
    fromDateMenu: false,
    timeChosen: "",
    fromDateVal: new Date().toISOString().substr(0, 10),
    emailNotifications: false,
    myTodoDropdown: ["Settings", "Account", "Log Out"],
    inset: false,
    notifications: [
      {
        type: "Notification",
        length: 30,
        unit: "Minutes",
        filled: false
      },
      {
        type: "Notification",
        length: 30,
        unit: "Minutes",
        filled: false
      }
    ],
    userid: localStorage.getItem("user").replace(/"/g, ""),
    taskName: "",
    notificationType: ["Email", "Notification"],
    notificationUnit: ["Minutes", "Hours", "Days", "Weeks"],
    alert: 0,
    myEvents: [],
    snackbar: {
      active: false,
      message: ""
    },
    details: false,
    notCompleted: [
      {
        userId: localStorage.getItem("user"),
        verificationToken: localStorage.getItem("token"),
        taskName: "",
        deadlineDate: "",
        deadlineTime: "",
        notification1: {
          type: "Notification",
          length: 30,
          unit: "Minutes",
          filled: false
        },
        notification2: {
          type: "Notification",
          length: 30,
          unit: "Minutes",
          filled: false
        },
        completed: true
      }
    ],
    completed: [],
    reload: 0,
    updateIndex: 0,
    fromDateMenu2: false,
    temp: []
  }),
  methods: {
    rerender: function() {
      this.reload += 1;
    },
    notificationExists1: function(index) {
      if (this.myEvents[index].notification1 == null) {
        return false;
      }
      return true;
    },
    notificationExists2: function(index) {
      if (this.myEvents[index].notification2 == null) {
        return false;
      }
      return true;
    },
    notificationChecker: function(notificationNumber) {
      if (this.notifications[notificationNumber].filled) {
        return this.notifications[notificationNumber];
      } else {
        return null;
      }
    },
    events: async function() {
      let credentials = {
        userId: localStorage.getItem("user"),
        verificationToken: localStorage.getItem("token")
      };
      let abc = await getList.get(credentials);
      this.myEvents = abc.data;
      // console.log(abc.data);
      let arr = [];
      let arrC = [];
      for (let i of this.myEvents) {
        // console.log(i);
        if (!i.completed) {
          arr.push(i);
        } else {
          arrC.push(i);
        }
      }
      if (arr.length != 0) this.notCompleted = arr;
      // console.log(this.notCompleted[0]);
      this.completed = arrC;
      this.rerender();
      // console.log("rerender2");
      // console.log(this.completed);
      // console.log(this.notCompleted);
      return abc;
    },
    saveUpdate: function() {
      let thisTask = this.notCompleted[this.updateIndex];
      let data = {
        item: {
          _id: thisTask._id,
          userId: localStorage.getItem("user"),
          verificationToken: localStorage.getItem("token"),
          title: thisTask.taskName,
          deadlineDate: thisTask.deadlineDate,
          deadlineTime: thisTask.deadlineTime,
          notification1: thisTask.notification1,
          notification2: thisTask.notification2,
          completed: false
        }
      };
      let updatedTime = new Date().getHours() + ":" + new Date().getMinutes();
      if (
        thisTask.deadlineDate == this.today &&
        parseInt(updatedTime.substring(0, 2)) >
          parseInt(thisTask.deadlineTime.substring(0, 2))
      ) {
        this.snackbar.active = true;
        this.snackbar.message = "Please choose a valid time";
        return;
      } else if (
        thisTask.deadlineDate == this.today &&
        parseInt(updatedTime.substring(0, 2)) ==
          parseInt(thisTask.deadlineTime.substring(0, 2)) &&
        parseInt(updatedTime.substring(3, 5)) >=
          parseInt(thisTask.deadlineTime.substring(3, 5))
      ) {
        this.snackbar.active = true;
        this.snackbar.message = "Please choose a valid time";
        return;
      } else if (thisTask.taskName.length == 0) {
        //empty task name
        this.snackbar.active = true;
        this.snackbar.message = "Please enter a task name";
        return;
      } else {
        updateService.getter(data.item);
        this.details = false;
      }
    },
    update: function(index) {
      this.details = true;
      this.temp = this.notCompleted[this.updateIndex];
      // console.log(this.updateIndex);
      this.updateIndex = index;

      // console.log(
      //   "not completed;" +
      //     JSON.stringify(this.notCompleted[this.updateIndex].notification1)
      // );
      // console.log(
      //   "not completed;" +
      //     JSON.stringify(this.notCompleted[this.updateIndex].notification2)
      // );

      // console.log(index);
    },
    validate: function() {
      // // console.log("datedisp" + this.fromDateDisp);
      // // console.log("taskname" + this.taskName);
      // // console.log("fromDateVal:" + this.fromDateVal);
      // // console.log("today" + this.today);
      // console.log("timeNow:" + this.timeNow);
      // console.log("timeChosen" + this.timeChosen);
      // console.log("timeEntered:" + this.timeEntered);
      // // console.log("not1:" + this.notifications[0]);
      // // console.log("not2:" + this.notifications[1]);
      if (this.timeChosen == "") {
        this.timeChosen = this.timeEntered;
      }
      let data = {
        item: {
          userId: localStorage.getItem("user"),
          verificationToken: localStorage.getItem("token"),
          title: this.taskName,
          deadlineDate: this.fromDateDisp,
          deadlineTime: this.timeChosen,
          notification1: this.notifications[0],
          notification2: this.notifications[1],
          completed: false
        }
      };

      //invalid time
      if (
        this.fromDateVal == this.today &&
        parseInt(this.timeNow.substring(0, 2)) >
          parseInt(this.timeChosen.substring(0, 2))
      ) {
        this.snackbar.active = true;
        this.snackbar.message = "Please choose a valid time";
        return;
      } else if (
        this.fromDateVal == this.today &&
        parseInt(this.timeNow.substring(0, 2)) ==
          parseInt(this.timeChosen.substring(0, 2)) &&
        parseInt(this.timeNow.substring(3, 5)) >=
          parseInt(this.timeChosen.substring(3, 5))
      ) {
        this.snackbar.active = true;
        this.snackbar.message = "Please choose a valid time";
        return;
      } else if (this.taskName.length == 0) {
        //empty task name
        this.snackbar.active = true;
        this.snackbar.message = "Please enter a task name";
        return;
      } else {
        addItem.getter(data);
        this.notCompleted.push(data.item);
        this.myEvents.push(data.item);
        this.snackbar.active = false;
        this.rerender();
        this.dialog = false;
        this.taskName = "";
        this.timeChosen = "";
        this.fromDateVal = new Date().toISOString().substr(0, 10);
        this.events();
      }
    },
    updateNotification: function() {
      if (!this.notCompleted[this.updateIndex].notification1.filled) {
        console.log("running");
        this.notCompleted[this.updateIndex].notification1.filled = true;
        this.rerender();
        return;
      }
      if (!this.notCompleted[this.updateIndex].notification2.filled) {
        console.log("running2");
        this.notCompleted[this.updateIndex].notification2.filled = true;
        return;
      }
    },
    addNotification: function() {
      if (!this.notifications[0].filled) {
        this.notifications[0].filled = true;
        return;
      }
      if (!this.notifications[1].filled) {
        this.notifications[1].filled = true;
        return;
      }
    },
    cancel: function() {
      this.notifications[0].filled = false;
      this.notifications[1].filled = false;
    },
    logout: async function() {
      let bToken = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      await logoutService.logout(bToken, user);
      this.$router.replace({ name: "login" });
    },
    updateEvents: async function(event) {
      event.completed = true;
      await completedService.post({ id: event._id });
    }
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
    },
    yesterday: function() {
      let today = new Date();
      let yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);
      yesterday = yesterday.toISOString().substr(0, 10);
      return yesterday;
    },
    timeEntered: {
      get() {
        let hours = new Date().getHours();
        let hoursFormatted = ("0" + hours).slice(-2);
        let minutes = new Date().getMinutes();
        let minutesFormatted = ("0" + minutes).slice(-2);
        return hoursFormatted + ":" + minutesFormatted;
      },
      set(x) {
        this.timeChosen = x;
      }
    }
  },
  created: function() {
    this.events();
  }
};
</script>

<style>
/*        <v-btn text large v-on="on" class="pt-1 mr-4 title">
*/
.appsidebar {
  min-height: 100px;
  min-width: 100px;
}
.v-picker {
  max-height: 50% !important;
}
myAlert {
  position: absolute;
  width: 50%;
  height: 10%;
  display: float;
}
#looking {
  width: 70% !important;
  float: right;
}
.toolbar{
  width:150px;
}
.mh-5{
  max-height: 5%;
}
</style>
