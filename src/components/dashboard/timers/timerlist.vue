<template>
                <div v-if="this.timers && this.timerHistory">
                    <div class="mt-12 max-w-7xl mx-auto grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 grid-flow-rows gap-4 px-4">
                        <div class="col-span-1" v-for="timer in this.timers" v-bind:key="timer._id">
                            <dashboardtimers :listdata="timer" :totaltime="totaltimes" @stopTimer="stopTimer" @startTimer="startTimer"></dashboardtimers>
                        </div>
                        <div class="group border-green-500 hover:bg-white border-2 border-dashed p-4 w-full h-auto mx-auto flex rounded-md hover:shadow-lg hover:border-transparent cursor-pointer">
                            <div class="m-auto text-center">
                                <h1 class="text-2xl text-green-500 font-semibold"><i class="lni lni-plus"></i></h1>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import dashboardtimers from '@/components/dashboard/timers/timers'

export default {
    name: "dashboardTimerTimerlist",
    data() {
        return {
            userinfo: null,
            timers: null,
            totaltimes: null,
            auth: false,
            timerHistory: [],
            dataReady: false,
            showTextCreateNewTimer: false
        }
    },
    mounted: async function() {
        await this.checkUser();
        await this.fetchTimers();
        await this.fetchHistory();
        await this.startInterval(this.timers)

        this.dataReady = true;
    },
    methods: {
        // Check user
        checkUser: async function() {
                const store = useStore();
                const router = useRouter();

                if(computed(() => store.state.authenticated)) {
                    this.auth = computed(() => store.state.authenticated);
                } else {
                    await router.push('/')
                }
                

                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                    }).then(response => response.json()).then(data => this.userinfo = data);
                } catch(e) {
                    await store.dispatch(('setAuth'), false)
                }
        },
        // Fetch timers
        fetchTimers: async function() {
            try {
                await fetch('http://localhost:8000/api/timers/'+this.userinfo.name, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(response => response.json()).then(data => this.timers = data);
                // set loading false (no spinner anymore)
                this.setLoading = false


            } catch(e) {
                console.log(e)
            }
        },
        fetchHistory: async function() {
            try {
                await fetch('http://localhost:8000/api/timers/history/'+this.userinfo.name, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }).then(response => response.json()).then(data => this.timerHistory = data);
                

                // add to history of todays time
                this.addToHistory(this.timers, this.timerHistory)

            } catch(e) {
                console.log(e)
            }
        },
        
        // startinterval for the given timerlist if they have a startdate. if no then just ignore.
        startInterval: async function(timerlist) {
                    setInterval(async function() {
                        if(timerlist) {
                            timerlist.forEach(timer => {
                                if(timer.startDate) {
                                    // set the time in this format: hh:mm:ss
                                    timer.time = new Date((Date.now() - timer.startDate) / 1000 * 1000).toISOString().substr(11, 8)
                            }
                        });
                    }
            }, 20);
        },

        startTimer: async function(timer) {
            if(timer.startDate == null) {

                // find object in timers with the same id and set the startdate to now
                var obj = this.timers.findIndex(obj => obj._id == timer._id)
                this.timers[obj].startDate = Date.now()

                // data to set startDate of the timer with the title
                var data = { "title": timer.title, "startDate": new Date().getTime() }

                try {
                    await fetch('http://localhost:8000/api/timers/changedate/'+this.userinfo.name, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(data)
                    }).then(response => response.json()).then(data => console.log("Successfully started"));


                } catch(e) {
                    console.log(e)
                }

                // add to history of todays time
                this.addToHistory(this.timers, this.timerHistory)
            }
        },
        stopTimer: async function(timer) {
            if(timer.startDate != null) {
                
                // data for timerhistory to set startDate and elapsedTime. The end date is NOW
                var data = { "title": timer.title, "startDate": timer.startDate, "elapsedTime": (Date.now() - timer.startDate) }

                try {
                    await fetch('http://localhost:8000/api/timers/addhistory', {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(data)
                    }).then(response => response.json()).then(data => this.timerHistory.push(data));


                    // find object in timers with the same id and set startdate to null and time to 00:00:00
                    var obj = this.timers.findIndex(obj => obj._id == timer._id)
                    this.timers[obj].startDate = null
                    this.timers[obj].time = '00:00:00'

                    // add to history of todays time
                    this.addToHistory(this.timers, this.timerHistory)


                } catch(e) {
                    console.log(e)
                }
                try {
                    await fetch('http://localhost:8000/api/timers/setdate/null/'+this.userinfo.name, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify({"title": timer.title})
                    }).then(response => response.json()).then(data => console.log(data));


                } catch(e) {
                    console.log(e)
                }
            }
        },
        sum: function(obj, obj2) {

                // if obj exist then continue and forloop all entries of obj. 
                // If the title is the same then add the elapsed time to a list
                // at the end return the list values. First sum then.
                
                if(obj) {
                    var list = [];
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;

                    for (let [key, value] of Object.entries(obj)) {
                        if(obj[key].timerTitle === obj2.title) {
                            var jsonString = JSON.stringify(value)
                            var jsonObj = JSON.parse(jsonString)
                            list.push(Math.round(parseInt(jsonObj['elapsedTime'])))
                        }
                    }
                    return Math.round(list.reduce(reducer, 0));
                }
        },

        addToHistory: function(list1, list2) {
            // for each every item in list 1, then if list2 is there then foreach every item in list2
                list1.forEach(timer => {
                    if(list2) {
                        list2.forEach(history => {
                            // variables to get the date from the timestamps
                            var dayToday = new Date(Date.now())
                            var dayInHistory = new Date(+history.startDate)

                            // if the day from item is the same as today then add it.
                            if((dayInHistory.getUTCDate()) === dayToday.getUTCDate()) {
                                // Sum the elapased time with the list2
                                timer.elapsedTime = new Date((this.sum(list2, timer) / 1000) * 1000).toISOString().substr(11, 8)
                            }
                        });
                    }
                });
        }
        
    },
    components: {
        dashboardtimers
    }
}
</script>