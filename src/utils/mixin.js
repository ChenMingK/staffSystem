// mixin混入相比写在utils可以不用手动绑定this直接调用公有方法，书写更为简洁
export const componentMixin = {
  computed: {
    // 记录权限
    privilege() {
      return this.$store.state.privilege
    }
  },
  methods: {
    // 隐藏vue-create-api动态创建的组件
    hideForm() {
      if (this.formComponent) {
        this.formComponent.remove() // vue-create-api要删除之前的才能再调用
        this.formComponent = null
      }
      if (this.editComponent) {
        this.editComponent.remove() // vue-create-api要删除之前的才能再调用
        this.editComponent = null
      }
      if (this.toastComponent) {
        this.toastComponent.remove()
        this.toastComponent = null
      }
    },
    // 与页数相关的操作
    paging(data) {
      let arr = []
      let pages = Math.floor(data.length / 10) + 1
      for (let i = 0; i < pages; i++) {
        arr[i] = []
        for (let j = 0; j < 10; j++) {
          if ((i === pages - 1) && (i * 10 + j === data.length)) { // 25 -> max: [2][4]
            break
          } 
          arr[i][j] = data[i * 10 + j]
        }
      }
      this.pagingList = arr
      this.allPages = arr.length + 1
    },
    firstPage() {
      this.currentPage = 1
    },
    prevPage() {
      if (this.currentPage === 1) return
      this.currentPage -= 1
    },
    nextPage() {
      if (this.currentPage === this.allPages) return
      this.currentPage += 1
    }
  }
}
