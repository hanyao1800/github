!function(d,L){"use strict";var $=ht.AlarmSeverity=function($,u,R,W,k){this.value=$,this.name=u,this.nickName=R,this.color=W,this.displayName=k};ht.Default.def("ht.AlarmSeverity",L,{toString:function(){return this.displayName||this.name}}),function(){$.severities=new ht.List,$._vm={},$._nm={},$._cp=function(s,I){if(s&&I){var p=s.value-I.value;return p>0?1:0>p?-1:0}return s&&!I?1:!s&&I?-1:0},$.each=function(K,k){$.severities.each(K,k)},$.getSortFunction=function(){return $._cp},$.setSortFunction=function(m){$._cp=m,$.severities.sort(m)},$.add=function(E,F,z,C,H){var D=new $(E,F,z,C,H);return $._vm[E]=D,$._nm[F]=D,$.severities.add(D),$.severities.sort($._cp),D},$.remove=function(x){var V=$._nm[x];return V&&(delete $._nm[x],delete $._vm[V.value],$.severities.remove(V)),V},$.CRITICAL=$.add(500,"Critical","C","#FF0000"),$.MAJOR=$.add(400,"Major","M","#FFA000"),$.MINOR=$.add(300,"Minor","m","#FFFF00"),$.WARNING=$.add(200,"Warning","W","#00FFFF"),$.INDETERMINATE=$.add(100,"Indeterminate","N","#C800FF"),$.CLEARED=$.add(0,"Cleared","R","#00FF00"),$.isClearedAlarmSeverity=function(M){return M?0===M.value:!1},$.getByName=function(Y){return $._nm[Y]},$.getByValue=function(H){return $._vm[H]},$.clear=function(){$.severities.clear(),$._vm={},$._nm={}},$.compare=function(V,f){return $._cp(V,f)}}();var l=ht.AlarmState=function(n){this._d=n,this._nm={},this._am={},this._ps=null,this._haa=null,this._hna=null,this._hoa=null,this._hta=null,this._hls=!1,this._aac=0,this._nac=0};ht.Default.def("ht.AlarmState",L,{_ep:!0,_f:function(){this._c1(),this._c2(),this._c3(),this._c4(),this._c5(),this._c6(),this._c7(),this._d.fp("alarmState",null,this)},getHighestAcknowledgedAlarmSeverity:function(){return this._haa},getHighestNewAlarmSeverity:function(){return this._hna},getHighestOverallAlarmSeverity:function(){return this._hoa},getHighestNativeAlarmSeverity:function(){return this._hta},hasLessSevereNewAlarms:function(){return this._hls},_c1:function(){var Z=null;for(var q in this._am)q=$.getByName(q),$.isClearedAlarmSeverity(q)||0!==this.getAcknowledgedAlarmCount(q)&&(Z=Z?$.compare(Z,q)>0?Z:q:q);this._haa=Z},_c2:function(){var D=null;for(var J in this._nm)J=$.getByName(J),$.isClearedAlarmSeverity(J)||0!==this.getNewAlarmCount(J)&&(D=D?$.compare(D,J)>0?D:J:J);this._hna=D},_c3:function(){if(!this._hna)return this._hls=!1,void 0;for(var E in this._nm)if(E=$.getByName(E),!$.isClearedAlarmSeverity(E)&&0!==this.getNewAlarmCount(E)&&$.compare(this._hna,E)>0)return this._hls=!0,void 0;this._hls=!1},_c4:function(){var Z=this._haa,I=this._hna,N=this._ps;this._hoa=Z,$.compare(I,this._hoa)>0&&(this._hoa=I),$.compare(N,this._hoa)>0&&(this._hoa=N)},_c5:function(){var i=this._haa,m=this._hna;this._hta=i,$.compare(m,this._hta)>0&&(this._hta=m)},increaseAcknowledgedAlarm:function(Q,S){if(0!==S){S=S||1;var Y=this._am[Q.name]||0;Y+=S,this._am[Q.name]=Y,this._f()}},increaseNewAlarm:function(m,p){if(0!==p){p=p||1;var F=this._nm[m.name]||0;F+=p,this._nm[m.name]=F,this._f()}},decreaseAcknowledgedAlarm:function(v,n){if(0!==n){n||(n=1);var q=this._am[v.name]||0;if(q-=n,0>q)throw"Alarm count can not be negative";this._am[v.name]=q,this._f()}},decreaseNewAlarm:function(F,R){if(0!==R){R||(R=1);var $=this._nm[F.name]||0;if($-=R,0>$)throw"Alarm count can not be negative";this._nm[F.name]=$,this._f()}},acknowledgeAlarm:function(C){this.decreaseNewAlarm(C,1),this.increaseAcknowledgedAlarm(C,1)},acknowledgeAllAlarms:function(x){if(x){var G=this.getNewAlarmCount(x);this.decreaseNewAlarm(x,G),this.increaseAcknowledgedAlarm(x,G)}else for(var e in this._nm)this.acknowledgeAllAlarms($.getByName(e))},_c6:function(){this._aac=0;for(var A in this._am)A=$.getByName(A),this._aac+=this.getAcknowledgedAlarmCount(A)},getAcknowledgedAlarmCount:function(b){return b?this._am[b.name]||0:this._aac},getAlarmCount:function(d){return this.getAcknowledgedAlarmCount(d)+this.getNewAlarmCount(d)},_c7:function(){this._nac=0;for(var D in this._nm)this._nac+=this.getNewAlarmCount($.getByName(D))},getNewAlarmCount:function(I){return I?this._nm[I.name]||0:this._nac},setNewAlarmCount:function(Z,Q){this._nm[Z.name]=Q,this._f()},removeAllNewAlarms:function(U){U?delete this._nm[U]:this._nm={},this._f()},setAcknowledgedAlarmCount:function(K,Y){this._am[K.name]=Y,this._f()},removeAllAcknowledgedAlarms:function(F){F?delete this._am[F.name]:this._am={},this._f()},isEmpty:function(){return!this._hoa},clear:function(){this._am={},this._nm={},this._f()},getPropagateSeverity:function(){return this._ps},setPropagateSeverity:function(Y){if(this._ep||(Y=null),this._ps!==Y){var L=this._ps;this._ps=Y,this._f(),this._d.fp("propagateSeverity",L,Y)}},isEnablePropagation:function(){return this._ep},setEnablePropagation:function(m){var n=this._ep;this._ep=m,this._d.fp("enablePropagation",n,m)&&(m||this.setPropagateSeverity(null))}});var E=ht.AlarmStatePropagator=function(H){this._dataModel=H,this._enable=!1,this._isPropagating=!1};ht.Default.def("ht.AlarmStatePropagator",L,{getDataModel:function(){return this._dataModel},isEnable:function(){return this._enable},setEnable:function(r){this._enable!==r&&(this._enable=r,this._enable?(this._dataModel.mm(this.handleDataModelChange,this),this._dataModel.md(this.handleDataPropertyChange,this),this._dataModel.each(function(j){this.propagate(j)},this)):(this._dataModel.umm(this.handleDataModelChange,this),this._dataModel.umd(this.handleDataPropertyChange,this)))},handleDataModelChange:function(h){h.data&&this.propagate(h.data)},handleDataPropertyChange:function(d){if("alarmState"===d.property||"enablePropagation"===d.property)this.propagate(d.data);else if("parent"===d.property){var i=d.oldValue;i&&this.propagate(i),this.propagate(d.data)}},propagate:function(M){M&&!this._isPropagating&&(this._isPropagating=!0,this.propagateToTop(M),this._isPropagating=!1)},propagateToTop:function(J){for(this.propagateToParent(null,J);J&&J.getParent();)this.propagateToParent(J,J.getParent()),J=J.getParent()},propagateToParent:function(L,m){var E=null;m.getChildren().each(function(Y){var q=Y.getAlarmState().getHighestOverallAlarmSeverity();$.compare(q,E)>0&&(E=q)}),m.getAlarmState().setPropagateSeverity(E)}}),ht.AlarmStateStatistics=function(V){this.sumNew=0,this.sumAcked=0,this.sumTotal=0,this.severtiyMap={},this.dataMap={},this.setDataModel(V)},ht.Default.def("ht.AlarmStateStatistics",L,{ms_fire:1,getDataModel:function(){return this._dataModel},setDataModel:function(c){var q=this._dataModel;q!==c&&(q&&(q.umd(this.handleDataPropertyChange,this),q.umm(this.handleDataModelChange,this),this.severtiyMap={},this.dataMap={}),this._dataModel=c,this.reset(),c.md(this.handleDataPropertyChange,this),c.mm(this.handleDataModelChange,this),this.fp("dataModel",q,c))},dispose:function(){this._dataModel.umd(this.handleDataPropertyChange,this),this._dataModel.umm(this.handleDataModelChange,this),delete this._dataModel},handleDataPropertyChange:function(U){"alarmState"===U.property&&(this.increase(U.data),this.fireAlarmStateChange())},handleDataModelChange:function(m){"add"===m.kind?(this.increase(m.data),this.fireAlarmStateChange()):"remove"===m.kind?(this.decrease(m.data),this.fireAlarmStateChange()):"clear"===m.kind&&(this.severtiyMap={},this.dataMap={},this.fireAlarmStateChange())},fireAlarmStateChange:function(){this.sumAcked=0,this.sumNew=0,this.sumTotal=0,$.each(function(Q){var W=this.getSumInfo(Q);this.sumAcked+=W.ackedCount,this.sumNew+=W.newCount,this.sumTotal+=W.totalCount},this),this.fp("alarmState",!1,!0)},getNewAlarmCount:function(G){if(!G)return this.sumNew;var Z=this.getSumInfo(G);return Z.newCount},getAcknowledgedAlarmCount:function(t){if(!t)return this.sumAcked;var m=this.getSumInfo(t);return m.ackedCount},getTotalAlarmCount:function(R){if(!R)return this.sumTotal;var P=this.getSumInfo(R);return P.totalCount},getSumInfo:function(q){var j=this.severtiyMap[q.name];return j||(j={},j.newCount=0,j.ackedCount=0,j.totalCount=0,this.severtiyMap[q.name]=j),j},decrease:function(x){var S=this.dataMap[x.getId()];S&&(delete this.dataMap[x.getId()],$.each(function(R){var u=S[R.name],w=this.getSumInfo(R);w.newCount=w.newCount-u.newCount,w.ackedCount=w.ackedCount-u.ackedCount,w.totalCount=w.totalCount-u.totalCount},this))},increase:function(H){if(this.decrease(H),!this._filterFunc||this._filterFunc(H)){var W={},s=H.getAlarmState();this.dataMap[H.getId()]=W,$.each(function(U){var h={};h.newCount=s.getNewAlarmCount(U),h.ackedCount=s.getAcknowledgedAlarmCount(U),h.totalCount=s.getAlarmCount(U),W[U.name]=h;var B=this.getSumInfo(U);B.newCount=B.newCount+h.newCount,B.ackedCount=B.ackedCount+h.ackedCount,B.totalCount=B.totalCount+h.totalCount},this)}},reset:function(){this.severtiyMap={},this.dataMap={},this._dataModel.each(this.increase,this),this.fireAlarmStateChange()},setFilterFunc:function(o){var X=this._filterFunc;this._filterFunc=o,this.reset(),this.firePropertyChange("filterFunc",X,o)},getFilterFunc:function(){return this._filterFunc}});var F=ht.Data.prototype;F.getAlarmState=function(){return this._alarmState||(this._alarmState=new l(this))},F=ht.DataModel.prototype,F.isEnableAlarmStatePropagator=function(){return!!this._alarmStatePropagator&&this._alarmStatePropagator.isEnable()},F.setEnableAlarmStatePropagator=function(R){R!=this.isEnableAlarmStatePropagator()&&(R?(this._alarmStatePropagator=new E(this)).setEnable(!0):this._alarmStatePropagator.setEnable(!1))},F=ht.graph.GraphView.prototype,F.getNote2=function(w){var $=w.getAlarmState().getHighestNewAlarmSeverity();if($){var Y=w.getAlarmState().getNewAlarmCount($)+$.nickName;return w.getAlarmState().hasLessSevereNewAlarms()&&(Y+="+"),Y}return w.s("note2")},F.getNote2Background=function(x){var b=x.getAlarmState().getHighestNewAlarmSeverity();return b?b.color:x.s("note2.background")},F.getBodyColor=function(E){var H=E.getAlarmState().getHighestNativeAlarmSeverity();return H?H.color:E.s("body.color")},F.getBorderColor=function(h){var n=h.getAlarmState().getPropagateSeverity();return n?n.color:h.s("border.color")},F=ht.widget.TreeView.prototype,F.getBorderColor=function(j){var w=j.getAlarmState().getPropagateSeverity();return w?w.color:j.s("border.color")},F.getIcon=function(P){return P.getIcon()?"__alarmIcon__":null},F=ht.widget.TreeTableView.prototype,F.getBorderColor=function(I){var y=I.getAlarmState().getPropagateSeverity();return y?y.color:I.s("border.color")},F.getIcon=function(O){return O.getIcon()?"__alarmIcon__":null},ht.Default.setImage("__alarmIcon__",{width:16,height:16,comps:[{type:"image",name:{func:function(T){return T.getIcon()}},color:{func:function(j){var p=j.getAlarmState().getHighestNativeAlarmSeverity();return p?p.color:j.s("body.color")}},rect:[0,0,16,16]}]});var w=ht.Style;w["note2.expanded"]=!0,w["note2.color"]="#000"}(this,Object);