export default {
  namespaced: true,
  modules: {},
  state: {
    style: {
      pageName: null,
      dividerStyle: {
        color: "#1989fa",
        borderColor: "#1989fa",
        padding: "0 16px",
        margin: "5px"
      },
      popupQueryParam: {
        height: "100%",
        width: "70%"
      }
    },
    msg: {
      finishedText: "我也是有底线的..."
    }
  },
  getters: {
    pageName: (_state, _getters, _rootState, _rootGetters) => {
      return _state.pageName
        ? _state.pageName
        : _rootGetters["userRoleAuth/system"]?.value;
    },
    dividerStyle: _state => _state.style.dividerStyle,
    popupQueryParamStyle: _state => _state.style.popupQueryParam,
    finishedText: _state => _state.msg.finishedText
  },
  mutations: {
    pageName: (_state, to) => {
      _state.pageName = to?.meta?.pageName;
    }
  }
};
