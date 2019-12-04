<template>
  <div class="job">
    <div class="job-filter">
      <div class="jf--item">
        <input v-model="jobName" type="text" placeholder="职位名称">
        <span class="iconfont icon-search"></span>
      </div>

      <div class="jf--item">
        <select v-model="selectedCategory">
          <option value="-1">筛选招聘类别</option>
          <option v-for="(option, i) in jobFilter.category" :key="i" :value="option.id">{{ option.title }}</option>
        </select>
        <span class="iconfont icon-down"></span>

      </div>

      <div class="jf--item">
        <select v-model="selectedArea">
          <option value="-1">筛选工作地区</option>
          <option v-for="(option, i) in jobFilter.area" :key="i" :value="option.id">{{ option.title }}</option>
        </select>
        <span class="iconfont icon-down"></span>

      </div>

      <div class="jf--item">
        <select v-model="selectedJobType">
          <option value="-1">筛选职位类别</option>
          <option v-for="(option, i) in jobFilter.job" :key="i" :value="option.id">{{ option.title }}</option>
        </select>
        <span class="iconfont icon-down"></span>

      </div>
    </div>

    <div class="job-list-wrap">
      <div class="jl--titles">
        <span class="flex2">职位名称</span>
        <span class="flex2">招聘类别</span>
        <span class="flex1">工作地区</span>
      </div>

      <div class="jl--list">

        <AccordionList :list="filteredJobList" light-theme @onFaqListTitleClick="handleItemClick"/>

        <div v-show="filteredJobList.length === 0" class="empty" @click="resetFilter">暂无相关职位</div>
      </div>
    </div>
  </div>
</template>

<script>
  import AccordionList from '~/components/AccordionList'

  // Group by array of objects https://stackoverflow.com/a/34890276
  function arrayGroupBy(arr, key) {
    return arr.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  export default {
    components: {
      AccordionList
    },
    props: {
      jobTypes: {
        type: Array,
        default: () => ([
          { 'id': 1, 'type': 'category', 'title': '社会招聘' },
          { 'id': 4, 'type': 'area', 'title': '北京' },
          { 'id': 7, 'type': 'job', 'title': '产品类' }
        ])
      },
      jobList: {
        type: Array,
        default: () => ([
          {
            title: 'IOS开发经理',
            recruType: { name: '社会招聘', value: 0 },
            jobArea: { name: '深圳', value: 1 },
            jobType: { name: '研发类', value: 1 },
            content: '职位描述'
          }
        ])
      }
    },
    data: () => ({
      jobName: '',
      selectedCategory: -1,
      selectedArea: -1,
      selectedJobType: -1

    }),
    computed: {
      jobTypesNameMap() {
        let ret = {}
        this.jobTypes.forEach(job => {
          ret[job.id] = job.title
        })
        return ret
      },
      jobFilter() {
        return arrayGroupBy(this.jobTypes, 'type')
      },
      filteredJobList() {
        const jobList = this.jobList
        const filterJobName = this.jobName
        const filterRecruType = this.selectedCategory
        const filterJobArea = this.selectedArea
        const filterJobType = this.selectedJobType

        const ret = []

        for (let i = 0; i < jobList.length; i++) {
          const job = jobList[i]
          const newJob = {}
          newJob.title = []

          if (job.title.indexOf(filterJobName) === -1) {
            continue
          }
          if (filterRecruType != -1 && job.t_category_id !== filterRecruType) {
            continue
          }
          if (filterJobArea != -1 && job.t_area_id !== filterJobArea) {
            continue
          }
          if (filterJobType != -1 && job.t_job_id !== filterJobType) {
            continue
          }
          newJob.title.push(job.title)
          newJob.title.push(this.jobTypesNameMap[job.t_category_id])
          newJob.title.push(this.jobTypesNameMap[job.t_area_id])
          newJob.content = job.desc

          ret.push(newJob)
        }

        return ret
      }
    },
    methods: {
      updateJobName(val, done) {
        this.jobName = val
        return done()
      },
      handleItemClick(item) {
        this.$emit('currentJobNameChange', item.title[0])
      },
      resetFilter() {
        this.jobName = ''
        this.selectedCategory = -1
        this.selectedArea = -1
        this.selectedJobType = -1
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .job
    max-width 1200px
    margin 0 auto
    padding 50px 40px
    background #FFF
    @media screen and (min-width $mobile_width) and (max-width $tablet_width) and (max-height $mobile_height_land)
      padding 40px 2%
    @media screen and (max-width: $mobile_width)
      padding 40px 4%

    .job-filter
      display flex
      justify-content space-between
      flex-wrap wrap

      .jf--item
        position: relative
        width 24%
        height 44px
        background #FFF
        @media screen and (min-width $mobile_width) and (max-width $tablet_width) and (max-height $mobile_height_land)
          width 24.5%
        @media screen and (max-width: $mobile_width)
          width 100%
          margin-bottom: 10px

        & > .iconfont
          position: absolute
          right 10px
          top 0
          line-height: 44px
          font-size 18px
          pointer-events none

        & > input, & > select
          width 100%
          height 100%
          line-height: 44px
          color #000
          border-radius 0
          -webkit-appearance none
          border 1px solid #ccc
          outline none
          padding 0 30px 0 10px
          font-size 16px
          background #FFF
          @media screen and (min-width $mobile_width) and (max-width $tablet_width) and (max-height $mobile_height_land)
            font-size 13px

          &:focus
            border-color: #CCC;

    .job-list-wrap
      margin-top: 30px

      .jl--titles
        display flex
        flex-direction row
        border-bottom 1px solid #ccc
        align-items center
        height 44px

        & > span
          color: #949494
          font-size 16px
          padding 0 20px
          @media screen and (max-width: $mobile_width)
            font-size 14px
            padding 0 10px

        & > span.flex1
          flex 1

        & > span.flex2
          flex 2
          @media screen and (max-width: $mobile_width)
            flex 1

      .jl--list
        & > .empty
          text-align: center
          padding-top: 50px
          cursor pointer

    .temp
      display none
</style>
