(function($){
    var url = window.location.href;
    function Nav(opt){
        this.menu = opt.menu || [['低氘水','http://localhost:9999/dist/html/list-product.html'],['重氧水',''],['低氘酒','']];
        this.parent = opt.parent;
        this.init();
        this.bindEvent();
    }
    Nav.prototype.init = function(){
        this.ceateNav();
    }
    Nav.prototype.ceateNav = function(){
        var str = '';
        this.menu.forEach(function(ele){
            var cl = '';
            if(ele[1] == url){
                cl = 'class="on"'
            }
            str += '<a ' + cl + ' href="'+ ele[1] +'">'+ ele[0] +'</a>';
        });
        $(this.parent).append(str);
    }   

    Nav.prototype.bindEvent = function(){}   

    $.fn.extend({
        listNav: function(opts){
            opts = opts || $('body');
            opts.parent = this;
            new Nav(opts);
        }
        
    })
})($);