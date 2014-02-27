"use strict";

requirejs.config({
    paths: {
        'khepri': 'dist',
        
        'bennu': 'dependencies/bennu/dist',
        'nu-stream': 'dependencies/nu/dist',
        'seshet': 'dependencies/seshet/dist/seshet',

        'khepri-ast': 'dependencies/khepri-ast/dist',
    }
});

require([
    'nu-stream/stream',
    'khepri/lex/lexer',
    'khepri/parse/parser',
    'khepri-ast/node'],
function(
    stream,
    lexer,
    parser,
    node)
{

var walk = function(ast, f) {
    if (ast instanceof node.Node) {
        var n = $("<div class='Node " + ast.type +"'><span class='NodeType'>"+ast.type+"</span></div>")
            .data('location', ast.loc);
        
        Object.getOwnPropertyNames(ast).forEach(function(key) {
            walk(ast[key], function(x) { n.append($("<div>" + key + ": </div>").append(x)); });
        });
        return f(n);
    }
    if (Array.isArray(ast)) {
        var n = $("<div class='Array'></div>");
        
        for (var i = 0; i < ast.length; ++i)
            walk(ast[i], function(x) { n.append(x); });
        
        return f(n);
    }
    return f($("<span>" + ast + "</span>"));
};


$(function(){
    var lexOut = $('.LexOut');
    
    $('.LexOut').delegate('.Token', 'hover', function() {
        $('.TokenInfo .TypeInfo .Value').text($(this).data('type'));
        $('.TokenInfo .ValueInfo .Value').text($(this).data('value'));
        $('.TokenInfo .LocationInfo .Value').text($(this).data('location'));
    });
    
    $('.ParseOut').delegate('.Node', 'mouseover mouseout', function(event) {
        event.stopPropagation();
        
        var nodeLoc = $(this).data('location');
        if (event.type == 'mouseover') {
            $(this).addClass('Active');
            lexOut.children().each(function(){
                var loc = $(this).data('location');
                if (loc.start.compare(nodeLoc.start) >= 0) {
                    if (loc.end.compare(nodeLoc.end) <= 0) {
                        $(this).addClass('Active');
                    } else {
                        return false;
                    }
                }
            });
        } else {
            $(this).removeClass('Active');
            lexOut.children('.Active').removeClass('Active');
        }
    });
    
    
    $('button').click(function() {
        var input = $('textarea').val();
        
        lexOut.children().remove();
        $('.ParseOut').children().remove();
        $('.ParseOut').text('');
        $('.ParseError').text('');
        $('.LexError').text('');
        
        var start = new Date().getTime();
        
        var nodes;
        try {
            nodes = lexer.lex(input);
        } catch (e) {
            $('.LexError').text(e);
            console.profileEnd();
            return;
        }
        console.profile();

        var ast;
        try
        {
            ast = parser.parseStream(nodes);
        } catch (e) {
            $('.ParseError').text(e);
        }
        
        console.profileEnd();
        var end = new Date().getTime();
        var diff = end - start;
        console.log(diff);
        $('#time').text(diff);
        
        walk(ast, function(x) {
            $('.ParseOut').append(x);
        });
        
        stream.forEach(function(v) {
            var type = v.type,
                value = (type === 'Whitespace' ? '' : v.value),
                location = v.loc;
            lexOut.append($("<span class='Token'>" + value + "</span>")
                .addClass(function() {
                    if (v.type === 'Whitespace' && v.value === '\t') {
                        return v.type + " Tab";
                    }
                    return v.type;
                }).data({
                    'type': type,
                    'value': value,
                    'location': location
                }));
        }, nodes);
    });
});

});
