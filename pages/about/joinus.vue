<template>
  <div class="w-container">
    <h1>Join us!</h1>
    <AboutJoinus
      :job-list="jobs"
      :job-types="jobTypes"
    />

  </div>
</template>

<script>
  import {getRecruits} from '~/assets/src/api/website'
  import AboutJoinus from '~/components/AboutJoinus'

  export default {
    components:{
      AboutJoinus
    },
    asyncData() {
      return getRecruits().then(res => {
        const {jobs, jobTypes} = res.data
        return {
          jobs,
          jobTypes
        }
      })
    }
  }
</script>
