// Generated by LiveScript 1.5.0
(function(){
  module.exports = function(str, options){
    var countSpaces, ref$, escape, getSpaces, process;
    countSpaces = (ref$ = options != null ? options.countSpaces : void 8) != null ? ref$ : 2;
    escape = function(str){
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
    getSpaces = function(str){
      var ref$, ref1$, ref2$;
      return (ref$ = (ref1$ = str.match(/^[ ]+/g)) != null ? (ref2$ = ref1$[0]) != null ? ref2$.length : void 8 : void 8) != null ? ref$ : 0;
    };
    process = function(previous, current){
      var findIgnore, eachIgnore, ref$, currentSpaces, nextSpaces, next, this$ = this;
      findIgnore = curry$(function(get, rule){
        return current.match(escape(get(rule)));
      });
      eachIgnore = function(get){
        if (typeof options.ignoreInside !== 'Array') {
          return false;
        }
        return p.any(findIgnore(get))(
        options.ignoreInside);
      };
      if (previous.ignore === true) {
        previous.push(current);
        if (eachIgnore(function(it){
          return it[1];
        })) {
          previous.ignore = false;
        }
        return previous;
      }
      previous.ignore = eachIgnore(function(it){
        return it[0];
      });
      if (current.replace(/[ ]+/g, "").length === 0) {
        return previous;
      }
      previous.spaces = (ref$ = previous.spaces) != null ? ref$ : 0;
      currentSpaces = getSpaces(current);
      nextSpaces = (function(){
        switch (false) {
        case currentSpaces !== previous.original:
          return previous.spaces;
        case currentSpaces !== previous.spaces:
          return currentSpaces;
        case !(currentSpaces > previous.spaces):
          return previous.spaces + countSpaces;
        default:
          return currentSpaces - currentSpaces % countSpaces;
        }
      }());
      next = current.replace(/^[ ]+/, (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = nextSpaces - 1; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }()).map(function(){
        return " ";
      }).join(""));
      previous.push(next);
      previous.spaces = nextSpaces;
      previous.original = currentSpaces;
      return previous;
    };
    return str = join('\n')(
    foldl(process, [])(
    str.split('\n')));
  };
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);