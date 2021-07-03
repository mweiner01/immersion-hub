<template>
    <div class="" v-if="dataReady">
            <div class="pt-12 pb-4 text-gray-800 font-semibold text-2xl text-left">
                <h1>Milestones</h1>
            </div>
            
            <div v-if="milestones.length > 0">
                <div v-if="milestones">
                    <milestones :listdata="milestones" @removeMilestone="remove"></milestones>
                </div>
            </div>

            <div v-if="setLoading" class="max-w-sm mr-auto">
                <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
            </div>

            <div v-if="noEntries">
                <createMilestone :ldta="milestones" @addMilestone="addMilestone"></createmilestone>
            </div>
    </div>
      <div class="absolute shadow z-50 top-0 left-0 bg-white h-full w-64" style="min-height: 890px;">
    <div class="pl-4 bg-white py-5 flex">
      <h1 class="uppercase text-gray-800 text-left text-xl leading-none">Dashboard</h1>
      <p class="ml-2 bg-purple-500 px-2 rounded-md text-white uppercase font-semibold">Beta</p>
    </div>
    <div class="text-white px-2">
      <div class="mb-3 text-green-700 font-bold uppercase text-sm pt-4 pl-2 flex">
        <h1>General</h1>
      </div>
      <div class="text-sm font-semibold text-black bg-green-200 bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <a href="/dashboard/users/<%= mysqlUser.username %>/manage/profile" class="px-2">Settings</a>
      </div>
    </div>
    <div class="text-white px-2">
      <div class="mb-3 text-green-700 font-bold uppercase text-sm pt-4 pl-2 flex">
        <h1>Insights</h1>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/profile" class="px-2">Profile</router-link>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/dashboard/timers" class="px-2">Timers</router-link>
      </div>
      <div class="text-sm font-semibold text-black hover:bg-green-200 hover:bg-opacity-50 hover:text-green-800 rounded pl-2 pr-12 py-2 mb-2">
        <router-link to="/dashboard/milestones" class="px-2">Milestones</router-link>
      </div>
    </div>
    <div class="text-white">
      <div class="my-3 text-md font-semibold tracking-tight pl-16 py-1 pt-12">
        <a href="/logout" class="bg-red-400 py-1 px-4 hover:bg-red-500 rounded">Ausloggen</a>
      </div>
    </div>
  </div>
    <div class="pl-64 absolute top-0 left-0 w-full z-0" style="min-width: 1610px">
      <div class="w-full bg-white shadow flex">
        <div class="ml-auto flex flex-wrap inline-block pr-32 mt-2">
          <div class="pl-4 pb-1">
            <img src="https://minotar.net/helm/makkuinJapan/100" class="h-10 w-10 rounded-full shadow-xl" alt="">
          </div>
          <div class="ml-2 text-sm mt-2 leading-none">
            <h1 class="text-gray-600 font-semibold"></h1>
            <h1 class="text-gray-500">Max</h1>
          </div>
        </div>
      </div>
    </div>
  <div class="pl-64 pt-16 w-full h-screen" style="min-width: 1610px;">
    <div class="pt-4 max-w-5xl mx-auto">
        <div class="pl-2 text-left">
          <h1 class="text-gray-800 text-4xl font-extrabold">Settings</h1>
        </div>
          <div class="pt-4 flex border-b text-gray-600 font-semibold">
            <div class="mr-4 px-2 py-4 border-b-2 text-green-600 border-green-600">
              <a href="">General</a>
            </div>
            <div class="mx-4 px-2 py-4 border-b-2 border-transparent hover:text-green-600 hover:border-green-600">
              <a href="">Password</a>
            </div>
            <div class="mx-4 px-2 py-4 border-b-2 border-transparent hover:text-green-600 hover:border-green-600">
              <a href="">Privacy</a>
            </div>
          </div>
        <div>
          <div class="pt-8 border-b py-6 px-2">
            <h1 class="text-gray-800 text-2xl font-medium">Profile</h1>
            <p class="text-gray-600 font-semibold">These informations are public, be careful what you share with others!</p>
          </div>
          <div class="flex py-6 border-b px-2">
            <div class="w-1/3">
              <h1 class="text-gray-600 font-semibold">Name</h1>
            </div>
            <div  class="w-1/3">
              <h1 class="text-black font-semibold"></h1>
            </div>
            <div class="w-1/3 text-right">
              <button class="text-green-600 hover:text-green-700 font-semibold ml-auto focus:outline-none">Update</button>
            </div>
          </div>


          <div class="flex py-6 border-b px-2">
            <div class="w-1/3">
              <h1 class="text-gray-600 font-semibold">E-Mail</h1>
            </div>
            <div  class="w-1/3">
              <h1 class="text-black font-semibold"></h1>
            </div>
            <div class="w-1/3 text-right">
                <a href="" class="text-green-600 hover:text-green-700 font-semibold ml-auto">Update</a>
            </div>
          </div>
          <div class="flex py-6 border-b px-2">
            <div class="w-1/3">
              <h1 class="text-gray-600 font-semibold">Profile picture</h1>
            </div>
            <div  class="w-1/3">
              <img src="https://minotar.net/helm/<%= mysqlUser.minecraft_name %>/100" class="h-8 rounded-full w-auto" alt="">
            </div>
            <div class="w-1/3 text-right">
              <button class="focus:outline-none text-green-600 hover:text-green-700 font-semibold ml-auto">Update</button><span class="text-gray-400 font-bold mx-2">|</span> <button href="" class="text-green-600 hover:text-green-700 font-semibold ml-auto focus:outline-none">Remove</button>
            </div>
          </div>
          <div class="flex py-6 border-b px-2">
            <div class="w-1/3">
              <h1 class="text-gray-600 font-semibold">Profile description</h1>
            </div>
            <div  class="w-1/3">
              <h1 class="text-black font-semibold"></h1>
            </div>
            <div class="w-1/3 text-right">
              <button class="focus:outline-none text-green-600 hover:text-green-700 font-semibold ml-auto">Update</button>
            </div>
          </div>
        </div>
              <div class="pt-12 pb-4 text-gray-800 font-semibold text-2xl text-left">
                <h1>Milestones</h1>
            </div>
            
            <div v-if="milestones.length > 0">
                <div v-if="milestones">
                    <milestones :listdata="milestones" @removeMilestone="remove"></milestones>
                </div>
            </div>

            <div v-if="setLoading" class="max-w-sm mr-auto">
                <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
            </div>

            <div v-if="noEntries">
                <createMilestone :ldta="milestones" @addMilestone="addMilestone"></createmilestone>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            
        }
    },
}
</script>