import fetch from "@/service";

class Utils {
  install(vue) {
    // vue.component("we-pagination", WePagination);
    // vue.component("we-table", WeTable);
    // VuexRouterSync.sync(store, router);
    Object.assign(vue.prototype, {
      _: _,
      // dayjs: dayjs,
      $fetch: fetch
    });
    _.mixin({
      findDefault(obj, predicate, defaults = false) {
        return _.find(obj, predicate) || defaults;
      },
      isFalsity(value) {
        if (value == null) {
          // 等同于 value === undefined || value === null
          return true;
        }
        switch (Object.prototype.toString.call(value).slice(8, -1)) {
          case "String":
            return !_.trim(value);
          case "Array":
            return _.isEmpty(value);
          case "Object":
            return _.isEmpty(value); // 普通对象使用 for...in 判断，有 key 即为 false
          default:
            return false; // 其他对象均视作非空
        }
      }
    });
  }
}

export default new Utils();
