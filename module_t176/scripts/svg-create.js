$(document) .ready(function () {
    function toDegrees(rad) {
        // convert rads to degrees
        return rad * (180 / Math.PI);
    }
    function toRadians(deg) {
        // convert degrees to rads
        return deg * (Math.PI / 180);
    }
    function getAngle(x, y) {
        // get angle of point from the centre of the circles
        angle = toDegrees(Math.atan2(y - 291, x - 291));
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }
    function sortAlphaReverse(a, b) {
        // reverse sort by id
        return a.id.toLowerCase() > b.id.toLowerCase() ? - 1 : 1;
    }
    function manageTabLayers(jq) {
        // hide and show tabbable elements as different layers are selected
        // also set aria-live on active layer
        if (jq.attr('id') == 'gid14') {
            $('svg g a') .attr('visibility', 'hidden');
            $('#' + jq.attr('id') + ' a') .attr('visibility', 'visible');
        } else {
            $('svg g a') .each(function () {
                if ($(this) .attr('class') .indexOf('actiontext') == - 1) {
                    $(this) .attr('visibility', 'hidden');
                }
            });
            $('#' + jq.attr('id') + ' a') .attr('visibility', 'visible');
        }
        $('svg g') .attr('aria-live', 'off');
        jq.attr('aria-live', 'polite');
    }
    // create snap element
    var paper = Snap('100%', 800);
	paper.attr({ 'xmlns:xlink': 'http://www.w3.org/1999/xlink' });
    // gradient for circle backgrounds 
    var gr = paper.gradient('l(1, 0, 0, 0)#ebd460-#fff');
    // paths for curved text
    var path2 = 'M 400, 400 m -240, 0 a 240,240 0 1,1 480,0 a 240,240 0 1,1 480,0';
    var path3 = 'M 400, 400 m -270, 0 a 270,270 0 1,1 540,0 a 270,270 0 1,1 540,0';
    var path4 = 'M 400, 400 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 600,0';
    var path5 = 'M 400, 400 m -280, 0 a 280,280 0 0,0 560,0 a 280,280 0 0,0 560,0';
    var path6 = 'M 400, 400 m -280, 0 a 280,280 1 1,0 560,0 a 280,280 1 1,0 560,0';
    // top segment
    var c17 = paper.circle(400, 400, 259);
    c17.attr({
        fill: gr
    });
    var t25 = paper.text(320, 200, 'Student-tutor learning') .attr({
        'style': 'font: 800 16px Verdana',
        'fill': '#ff9329'
    });
    var p8 = paper.multitext(400, 230, 300, 'Your tutor is an invaluable source of help and guidance on T176, and will support your ongoing personal and professional development and reflection throughout the module.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var t31 = paper.text(330, 310, 'Your tutor will help you by:') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t32 = paper.text(230, 330, 'responding to queries from you') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t33 = paper.text(230, 350, 'commenting on and grading your assignments') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t34 = paper.text(230, 370, 'monitouring your progress in your learning log') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t35 = paper.text(230, 390, 'providing individual guidance and support as you study the module.') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var c23 = paper.circle(220, 327, 2);
    c23.attr({
        fill: '#555'
    });
    var c24 = paper.circle(220, 347, 2);
    c24.attr({
        fill: '#555'
    });
    var c25 = paper.circle(220, 367, 2);
    c25.attr({
        fill: '#555'
    });
    var c26 = paper.circle(220, 387, 2);
    c26.attr({
        fill: '#555'
    });
	
	var link = paper.el("a", {
		'xlink:href': '#',
		class: 'reorder'
	});
    var im1 = paper.image('images/i1.png', 300, 420, 200, 200).prependTo(link);
    im1.attr({
        class: 'reorder',
		'xlink:title': 'Back to start'
    })
    group = paper.g(c17, c23, c24, c25, c26, t25, p8, t31, t32, t33, t34, t35, link);
    group.attr({
        id: 'gid18',
        class: 'infocircles'
    });
    // bottom left segment
    var c18 = paper.circle(400, 400, 259);
    c18.attr({
        fill: gr
    });
    var t26 = paper.text(350, 200, 'Team working') .attr({
        'style': 'font: 800 16px Verdana',
        'fill': '#ff9329'
    });
    // multipage text is done with snap plugin in snap.plugin.js
    var p9 = paper.multitext(400, 230, 300, 'This aspect of your studies will be developed particularly at residential schools. You will work in small teams under the guidance of experienced tutors, carrying out laboratory and field work and solving problems.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var p10 = paper.multitext(400, 330, 300, 'There are also a few team-working activities during the rest of the module. Your tutor-group forum is a place where you can interact with your tutor and the other students in your tutor group and discuss group activities. ') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
	var link = paper.el("a", {
		'xlink:href': '#',
		class: 'reorder'
	});
    var im1 = paper.image('images/i1.png', 300, 420, 200, 200).prependTo(link);
    im1.attr({
        class: 'reorder',
		'xlink:title': 'Back to start'
    })
    group = paper.g(c18, t26, p9, p10, link);
    group.attr({
        id: 'gid19',
        class: 'infocircles'
    });
    // bottom right segment
    var c19 = paper.circle(400, 400, 259);
    c19.attr({
        fill: gr
    });
    var t27 = paper.text(340, 200, 'Individual study') .attr({
        'style': 'font: 800 16px Verdana',
        'fill': '#ff9329'
    });
    var p12 = paper.multitext(400, 230, 300, 'As is common at university level, much of your study on T176 will be self-paced and self-directed. The module materials will help you to develop a wide range of skills that will aid this process. In the module you will explore the importance of, and interactions between, the following:') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var t28 = paper.text(230, 330, 'engineering professional and practice') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t29 = paper.text(230, 350, 'the engineer') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var t30 = paper.text(230, 370, 'personal development in engineering towards achieving goals') .attr({
        font: '12px Verdana',
        textAnchor: 'left',
        fill: '#555'
    });
    var c20 = paper.circle(220, 327, 2);
    c20.attr({
        fill: '#555'
    });
    var c21 = paper.circle(220, 347, 2);
    c21.attr({
        fill: '#555'
    });
    var c22 = paper.circle(220, 367, 2);
    c22.attr({
        fill: '#555'
    });
    var p13 = paper.multitext(400, 400, 370, 'These will be studied in the context of your own progression in learning towards your chosen qualifications. The module also provides important content for building towards external recognition of your learning, whether that is in the context of professional recognition, employability or further learning.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
	var link = paper.el("a", {
		'xlink:href': '#',
		class: 'reorder'
	});
    var im1 = paper.image('images/i1_small.png', 320, 480, 150, 150).prependTo(link);
    im1.attr({
        class: 'reorder',
		'xlink:title': 'Back to start'
    })
    group = paper.g(c19, c20, c21, c22, t27, p12, t28, t29, t30, p13, link);
    group.attr({
        id: 'gid20',
        class: 'infocircles'
    });
    // build blue inner circle groups
    var c13 = paper.circle(400, 400, 220);
    c13.attr({
        fill: 'white'
    });
    var c14 = paper.circle(520, 300, 55);
    c14.attr({
        'stroke-opacity': 0.7,
        fill: '#cb8ef2',
        'fill-opacity': 0.6,
    });
    var c15 = paper.circle(380, 410, 180);
    c15.attr({
        'stroke-opacity': 0.7,
        fill: '#74aada',
        'fill-opacity': 0.6
    });
    var c16 = paper.circle(550, 370, 55);
    c16.attr({
        'stroke-opacity': 0.7,
        fill: '#f2c2d6',
        'fill-opacity': 0.6
    });
    t37 = paper.text(540, 360, 'Case study') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#DB329D'
    });
    var p6 = paper.multitext(380, 320, 200, 'Here you will carry out laboratory and field-based activities to gain practical skills in taking measurements, analysing data, seeking and evaluating information, modelling, and making presentations..') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var p7 = paper.multitext(380, 440, 200, 'You will work in small under the guidance of experienced tutors, carrying out laboratory and field work and solving problems.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    t38 = paper.text(500, 280, 'Personal') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t39 = paper.text(500, 290, 'development') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t40 = paper.text(500, 300, 'planning') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t41 = paper.text(340, 260, 'Residential') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#0F1CD4'
    });
    t42 = paper.text(355, 280, 'school') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#0F1CD4'
    });
    group = paper.g(c13, t37, t38, t39, t40, c14, c15, c16, t41, t42, p6, p7);
    group.attr({
        id: 'gid17',
        class: 'infocircles'
    })
    // build pink inner circle groups
    var c9 = paper.circle(400, 400, 220);
    c9.attr({
        fill: 'white'
    });
    var c10 = paper.circle(280, 300, 55);
    c10.attr({
        'stroke-opacity': 0.7,
        fill: '#cb8ef2',
        'fill-opacity': 0.6,
    });
    var c11 = paper.circle(245, 370, 55);
    c11.attr({
        'stroke-opacity': 0.7,
        fill: '#74aada',
        'fill-opacity': 0.6
    });
    var c12 = paper.circle(425, 410, 180);
    c12.attr({
        'stroke-opacity': 0.7,
        fill: '#f2c2d6',
        'fill-opacity': 0.6
    });
    t31 = paper.text(385, 260, 'Case study') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#DB329D'
    });
    var p3 = paper.multitext(430, 300, 220, 'Here you will work on a case study that looks at nuclear power generation as an example of a complex and highly technological engineering industry.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var p4 = paper.multitext(430, 370, 280, 'The case study component of T176 serves two purposes: (i) to provide you with factual information about a significant area of engineering and (ii) to provide a context for an informal discussion of some of the non-technical or \'human\' aspects of working within complex, demanding and safety-critical engineering industries.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var p5 = paper.multitext(430, 480, 180, 'The case study is designed to motivate, complement and generally support various themes arising from the personal development planning element of the module.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    t32 = paper.text(240, 280, 'Personal') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t33 = paper.text(240, 290, 'development') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t34 = paper.text(240, 300, 'planning') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#620CA8'
    });
    t35 = paper.text(195, 370, 'Residential') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#0F1CD4'
    });
    t36 = paper.text(195, 385, 'school') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#0F1CD4'
    });
    group = paper.g(c9, t31, t32, t33, t34, t35, t36, c12, c11, c10, p3, p4, p5);
    group.attr({
        id: 'gid16',
        class: 'infocircles'
    })
    // build purple inner circle groups
    var c5 = paper.circle(400, 400, 220);
    c5.attr({
        fill: 'white'
    });
    var c6 = paper.circle(400, 370, 180);
    c6.attr({
        'stroke-opacity': 0.7,
        fill: '#cb8ef2',
        'fill-opacity': 0.6,
    });
    var c7 = paper.circle(360, 540, 55);
    c7.attr({
        'stroke-opacity': 0.7,
        fill: '#74aada',
        'fill-opacity': 0.6
    });
    var c8 = paper.circle(440, 540, 55);
    c8.attr({
        'stroke-opacity': 0.7,
        fill: '#f2c2d6',
        'fill-opacity': 0.6
    });
    t25 = paper.text(368, 240, 'Personal') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#620CA8'
    });
    t26 = paper.text(350, 260, 'development') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#620CA8'
    });
    t27 = paper.text(365, 280, 'planning') .attr({
        'style': 'font: 800 14px Verdana',
        'fill': '#620CA8'
    });
    var p2 = paper.multitext(400, 300, 300, 'Here you will develop skills and techniques towards becoming a more efficient and successful learner working towards professional engineering status by:') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    t28 = paper.text(420, 565, 'Case study') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#DB329D'
    });
    t29 = paper.text(320, 565, 'Residential') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#0F1CD4'
    });
    t30 = paper.text(334, 580, 'school') .attr({
        'style': 'font: 800 12px Verdana',
        'fill': '#0F1CD4'
    });
    group = paper.g(c5, t25, t26, t27, t28, t29, t30, c8, c7, c6, p2);
    group.attr({
        id: 'gid15',
        class: 'infocircles'
    })
    // build main outer circle layers and contents
    for (var j = 4; j > 0; j--) {
        var c1 = paper.circle(400, 400, (j * 30) + 200);
        if (j == 1) {
            c1.attr({
                fill: 'white',
                stroke: '#dfbd00',
                strokeWidth: 1,
                class: 'actioncircle' + j
            });
        } else {
            c1.attr({
                fill: gr,
                stroke: '#dfbd00',
                strokeWidth: 1,
                class: 'actioncircle' + j
            });
        }
        if (j == 1) {
			var link1 = paper.el("a", {
				'xlink:href': '#',
				class: 'purple-click',
				'xlink:title': 'Personal development plan'
			});
            var c2 = paper.circle(400, 320, 110).prependTo(link1);
            c2.attr({
                fill: '#cb8ef2',
                'fill-opacity': 0.6,
                'class': 'purple-click'
            });
			var link2 = paper.el("a", {
				'xlink:href': '#',
				class: 'blue-click',
				'xlink:title': 'Residential school'
			});
            var c3 = paper.circle(330, 450, 110).prependTo(link2);
            c3.attr({
                fill: '#74aada',
                'fill-opacity': 0.6,
                'class': 'blue-click'
            });
			var link3 = paper.el("a", {
				'xlink:href': '#',
				class: 'pink-click',
				'xlink:title': 'Case study'
			});
            var c4 = paper.circle(470, 450, 110).prependTo(link3);
            c4.attr({
                fill: '#f2c2d6',
                'fill-opacity': 0.6,
                'class': 'pink-click'
            });
            t5 = paper.text(368, 240, 'Personal') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#620CA8'
            });
            t6 = paper.text(350, 260, 'development') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#620CA8'
            });
            t11 = paper.text(350, 304, 'Study Guides') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#620CA8',
                'fill-opacity': '0.7'
            });
            t12 = paper.text(360, 324, '1, 2 and 3') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#620CA8',
                'fill-opacity': '0.7'
            });
            t7 = paper.text(380, 280, 'plan') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#620CA8'
            });
            t8 = paper.text(460, 440, 'Case study') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#DB329D'
            });
            t13 = paper.text(450, 460, 'Study Guides') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#DB329D',
                'fill-opacity': '0.7'
            });
            t14 = paper.text(460, 480, '1, 2 and 3') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#DB329D',
                'fill-opacity': '0.7'
            });
            t9 = paper.text(240, 420, 'Residential') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#0F1CD4'
            });
            t10 = paper.text(254, 440, 'school') .attr({
                'style': 'font: 800 14px Verdana',
                'fill': '#0F1CD4'
            });
            t15 = paper.text(230, 465, 'Preparatory study') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#0F1CD4',
                'fill-opacity': '0.7'
            });
            t16 = paper.text(265, 490, 'Laboratory') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#0F1CD4',
                'fill-opacity': '0.7'
            });
            t17 = paper.text(250, 510, 'and field-based') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#0F1CD4',
                'fill-opacity': '0.7'
            });
            t18 = paper.text(270, 530, 'activites') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#0F1CD4',
                'fill-opacity': '0.7'
            });
            t19 = paper.text(380, 460, 'Study') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#000',
                'fill-opacity': '0.7'
            });
            t20 = paper.text(380, 480, 'skills') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#000',
                'fill-opacity': '0.7'
            });
            t21 = paper.text(315, 365, 'Ongoing') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#000',
                'fill-opacity': '0.7'
            });
            t22 = paper.text(315, 385, 'reflection') .attr({
                'style': 'font: 800 13px Verdana',
                'fill': '#000',
                'fill-opacity': '0.7'
            });
			var link4 = paper.el("a", {
				'xlink:href': '#',
				class: 'overlay'
			});
            var path10 = paper.path('m 426,348 c 0,2.75 -2.25,5 -5,5 h -40.5 c -2.75,0 -5,-2.25 -5,-5 v -11.834 c 0,-2.75 2.25,-5 5,-5 h 40.5 c 2.75,0 5,2.25 5,5 v 11.834 z').prependTo(link4);
            path10.attr({
                fill: '#fff',
                stroke: '#9C9E9F',
                'stroke-width': '0.7087',
                'stroke-miterlimit': '3.8637',
                class: 'overlay',
				'xlink:title': 'Overlay'
            });
            var it1 = paper.text(378, 346, 'TMA 01') .attr({
                'style': 'font: 800 10.5px Verdana',
                'fill': '#555',
                class: 'overlay'
            });
            var path11 = paper.path('m 420,422 c 0,2.75 -2.25,5 -5,5 h -40.5 c -2.75,0 -5,-2.25 -5,-5 v -11.834 c 0,-2.75 2.25,-5 5,-5 h 40.5 c 2.75,0 5,2.25 5,5 v 11.834 z');
            path11.attr({
                fill: '#fff',
                stroke: '#9C9E9F',
                'stroke-width': '0.7087',
                'stroke-miterlimit': '3.8637',
                class: 'overlay'
            });
            var it2 = paper.text(380, 420, 'EMA') .attr({
                'style': 'font: 800 10.5px Verdana',
                'fill': '#555',
                class: 'overlay'
            });
            var path12 = paper.path('m 472,378 c 0,2.75 -2.25,5 -5,5 h -40.5 c -2.75,0 -5,-2.25 -5,-5 v -11.834 c 0,-2.75 2.25,-5 5,-5 h 40.5 c 2.75,0 5,2.25 5,5 v 11.834 z');
            path12.attr({
                fill: '#fff',
                stroke: '#9C9E9F',
                'stroke-width': '0.7087',
                'stroke-miterlimit': '3.8637',
                class: 'overlay'
            });
            var it3 = paper.text(424, 376, 'TMA 02') .attr({
                'style': 'font: 800 10.5px Verdana',
                'fill': '#555',
                class: 'overlay'
            });
            var path13 = paper.path('m 525,536 c 0,2.75 -2.25,5 -5,5 h -40.5 c -2.75,0 -5,-2.25 -5,-5 v -11.834 c 0,-2.75 2.25,-5 5,-5 h 40.5 c 2.75,0 5,2.25 5,5 v 11.834 z');
            path13.attr({
                fill: '#fff',
                stroke: '#9C9E9F',
                'stroke-width': '0.7087',
                'stroke-miterlimit': '3.8637',
                class: 'overlay'
            });
            var it4 = paper.text(476, 534, 'iCMA 41') .attr({
                'style': 'font: 800 10px Verdana',
                'fill': '#555',
                class: 'overlay'
            });
            var path14 = paper.path('m 350,551 c 0,2.75 -2.25,5 -5,5 h -40.5 c -2.75,0 -5,-2.25 -5,-5 v -11.834 c 0,-2.75 2.25,-5 5,-5 h 40.5 c 2.75,0 5,2.25 5,5 v 11.834 z');
            path14.attr({
                fill: '#fff',
                stroke: '#9C9E9F',
                'stroke-width': '0.7087',
                'stroke-miterlimit': '3.8637',
                class: 'overlay'
            });
            var it5 = paper.text(301, 549, 'iCMA 42') .attr({
                'style': 'font: 800 10px Verdana',
                'fill': '#555',
                class: 'overlay'
            });
            group = paper.g(c1, link2, link3, link1, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, link4, path11, path12, path13, path14, it1, it2, it3, it4, it5);
        } else if (j == 2) {
			var link1 = paper.el("a", {
				'xlink:href': '#',
				class: 'actiontext'
			});
            var t2 = paper.text(0, 0, 'T176 learning outcomes') .attr({
                'textpath': path2,
                'style': 'font: 800 16px Verdana',
                'fill': '#ff9329',
                'textAnchor': 'middle',
                class: 'actiontext'
            }).prependTo(link1);
            t2.textPath.attr({
                'startOffset': '25%'
            });
            var c17 = paper.circle(400, 400, 230);
            c17.attr({
                fill: 'white'
            });
            var p10 = paper.multitext(400, 240, 270, 'The learning outcomes outline what you can expect to acheive during your study of T176. Everything you do on the module contributes either directly or indirectly to completing them.') .attr({
                font: '12px Verdana',
                textAnchor: 'middle',
                fill: '#555'
            });
            var p11 = paper.multitext(400, 340, 270, 'As you study the module, you will accumulate learning that contributes towards the completion of each learning outcome. You will find that you complete parts of some learning outcomes more quickly than others.') .attr({
                font: '12px Verdana',
                textAnchor: 'middle',
                fill: '#555'
            });
			var link2 = paper.el("a", {
				'xlink:href': '#',
				class: 'reorder'
			});
            var im1 = paper.image('images/i1.png', 300, 420, 200, 200).prependTo(link2);
            im1.attr({
                class: 'reorder',
				'xlink:title': 'Back to start'
            })
            group = paper.g(c1, link1, c17, p10, p11, link2);
        } else if (j == 3) {
			var link1 = paper.el("a", {
				'xlink:href': '#',
				class: 'actiontext action1'
			});
            var t3 = paper.text(0, 0, 'Student-tutor learning') .attr({
                'textpath': path3,
                'style': 'font: 800 16px Verdana',
                'fill': '#ff9329',
                'textAnchor': 'middle',
                'textAnchor': 'middle',
                class: 'actiontext action1'
            }).prependTo(link1);
            t3.textPath.attr({
                'startOffset': '25%'
            });
			var link2 = paper.el("a", {
				'xlink:href': '#',
				class: 'actiontext action2'
			});
            var t23 = paper.text(0, 0, 'Team working') .attr({
                'textpath': path6,
                'style': 'font: 800 16px Verdana',
                'fill': '#ff9329',
                'textAnchor': 'middle',
                class: 'actiontext action2'
            }).prependTo(link2);
            t23.textPath.attr({
                'startOffset': '9%'
            });
			var link3 = paper.el("a", {
				'xlink:href': '#',
				class: 'actiontext action3'
			});
            var t24 = paper.text(0, 0, 'Individual study') .attr({
                'textpath': path5,
                'style': 'font: 800 16px Verdana',
                'fill': '#ff9329',
                'textAnchor': 'middle',
                class: 'actiontext action3'
            }).prependTo(link3);
            t24.textPath.attr({
                'startOffset': '40%'
            });
            var line1angle1 = toRadians(90);
            var line1angle2 = toRadians(210);
            var line1angle3 = toRadians(330);
            var l1 = paper.line(parseInt(400 + (260) * Math.cos(line1angle1)), parseInt(400 + (260) * Math.sin(line1angle1)), parseInt(400 + (290) * Math.cos(line1angle1)), parseInt(400 + (290) * Math.sin(line1angle1)));
            l1.attr({
                stroke: '#dfbd00',
                strokeWidth: 1
            });
            var l2 = paper.line(parseInt(400 + (260) * Math.cos(line1angle2)), parseInt(400 + (260) * Math.sin(line1angle2)), parseInt(400 + (290) * Math.cos(line1angle2)), parseInt(400 + (290) * Math.sin(line1angle2)));
            l2.attr({
                stroke: '#dfbd00',
                strokeWidth: 1
            });
            var l3 = paper.line(parseInt(400 + (260) * Math.cos(line1angle3)), parseInt(400 + (260) * Math.sin(line1angle3)), parseInt(400 + (290) * Math.cos(line1angle3)), parseInt(400 + (290) * Math.sin(line1angle3)));
            l3.attr({
                stroke: '#dfbd00',
                strokeWidth: 1
            });
            var c18 = paper.circle(400, 400, 260);
            c18.attr({
                fill: gr,
                stroke: '#dfbd00',
                strokeWidth: 1
            });
            group = paper.g(c1, link1, link2, link3, l1, l2, l3, c18);
        } else if (j == 4) {
			var link1 = paper.el("a", {
				'xlink:href': '#',
				class: 'actiontext'
			});
            var t4 = paper.text(0, 0, 'Learning log') .attr({
                'textpath': path4,
                'style': 'font: 800 16px Verdana',
                'fill': '#ff9329',
                'textAnchor': 'middle',
                class: 'actiontext'
            }).prependTo(link1);
            t4.textPath.attr({
                'startOffset': '25%'
            });
            var p1 = paper.multitext(400, 200, 280, 'Keeping a record of your learning is very important in T176.This will both support your study of the module and be a resource that you will need to use for completion of the assessments. In the wider context of personal and professional development, maintaining a log of experience and skills is an important requirement.') .attr({
                font: '12px Verdana',
                textAnchor: 'middle',
                fill: '#555'
            });
            var p2 = paper.multitext(400, 320, 300, 'The module website contains the learning log tool for you to record and reflect on your progress throughout the module. It will form a record of your achievements that you can use to complete the TMAs and EMAs and also take forward into your future studies.') .attr({
                font: '12px Verdana',
                textAnchor: 'middle',
                fill: '#555'
            });
			var link2 = paper.el("a", {
				'xlink:href': '#',
				class: 'reorder'
			});
            var im1 = paper.image('images/i1.png', 300, 420, 200, 200).prependTo(link2);
            im1.attr({
                class: 'reorder',
				'xlink:title': 'Back to start'
            })
            group = paper.g(c1, link1, p1, p2, link2);
        } else {
            group = paper.g(c1);
        }
        group.attr({
            id: 'gid1' + j,
            class: 'infocircles'
        })
    }
    // iCMA 42 text box overlay
    var path7 = paper.path('M271.021,544.083c0,2.75-2.25,5-5,5H5.354c-2.75,0-5-2.25-5-5v-61.334c0-2.75,2.25-5,5-5H266.02 c2.75,0,5,2.25,5,5L271.021,544.083L271.021,544.083z');
    path7.attr({
        fill: '#FFFFFF'
    });
    var path8 = paper.path('M271.021,544.083c0,2.75-2.25,5-5,5 H5.354c-2.75,0-5-2.25-5-5v-61.334c0-2.75,2.25-5,5-5H266.02c2.75,0,5,2.25,5,5L271.021,544.083L271.021,544.083z');
    path8.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '0.7087',
        'stroke-miterlimit': '3.8637'
    });
    var p2 = paper.multitext(129, 496, 150, 'iCMA 42 : the second interactive computer-marked assignment (iCMA) will help you prepare for residential school.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var path9 = paper.path('M271.021,514.417c25.521-3.525,49.148-28.906,54.056-59.865');
    path9.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '2.2677'
    });
    var poly1 = paper.polyline(326.001, 441.774, 331.827, 460.381, 324.84, 455.491, 317.131, 459.137);
    poly1.attr({
        fill: '#B1B3B4'
    });
    group_icma42 = paper.g(path7, path8, p2, path9, poly1);
    group_icma42.attr({
        id: 'gid24',
        transform: 't 3 107',
        visibility: 'hidden'
    });
    // iCMA 41 text box overlay
    var path7 = paper.path('M789.314,544.083c0,2.75-2.25,5-5,5H548.981c-2.75,0-5-2.25-5-5v-61.334c0-2.75,2.25-5,5-5h235.333 c2.75,0,5,2.25,5,5V544.083z');
    path7.attr({
        fill: '#FFFFFF'
    });
    var path8 = paper.path('M789.314,544.083c0,2.75-2.25,5-5,5 H548.981c-2.75,0-5-2.25-5-5v-61.334c0-2.75,2.25-5,5-5h235.333c2.75,0,5,2.25,5,5V544.083z');
    path8.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '0.7087',
        'stroke-miterlimit': '3.8637'
    });
    var p2 = paper.multitext(670, 498, 150, 'iCMA 41 : the first interactive computer-marked assignment (iCMA) focuses on the case study.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var path9 = paper.path('M543.981,514.249c-27.578-7.078-40.932-41.561-43.295-74.695');
    path9.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '2.2677'
    });
    var poly1 = paper.polyline(500.314, 426.749, 508.31, 444.532, 500.791, 440.508, 493.57, 445.043);
    poly1.attr({
        fill: '#B1B3B4'
    });
    group_icma41 = paper.g(path7, path8, p2, path9, poly1);
    group_icma41.attr({
        id: 'gid23',
        transform: 't -2 107',
        visibility: 'hidden'
    });
    // TMA 02 text box overlay
    var path7 = paper.path('M845.981,305.417c0,2.75-2.25,5-5,5h-218c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h218 c2.75,0,5,2.25,5,5V305.417z');
    path7.attr({
        fill: '#FFFFFF'
    });
    var path8 = paper.path('M845.981,305.417c0,2.75-2.25,5-5,5h-218 c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h218c2.75,0,5,2.25,5,5V305.417z');
    path8.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '0.7087',
        'stroke-miterlimit': '3.8637'
    });
    var p2 = paper.multitext(735, 258, 150, 'TMA 02 : your second tutor -marked assignment (TMA) contains PDP and case study elements.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var path9 = paper.path('M617.981,274.749c-30.239-21.291-97.195-44.28-139.885-14.27');
    path9.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '2.2677'
    });
    var poly1 = paper.polyline(468.314, 268.749, 477.562, 251.583, 478.943, 259.999, 486.936, 262.97);
    poly1.attr({
        fill: '#B1B3B4'
    });
    group_tma02 = paper.g(path7, path8, p2, path9, poly1);
    group_tma02.attr({
        id: 'gid22',
        transform: 't -2 107',
        visibility: 'hidden'
    });
    // TMA 01 text box overlay

    var path7 = paper.path('M796.648,187.416c0,2.75-2.25,5-5,5h-208c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h208 c2.75,0,5,2.25,5,5V187.416z');
    path7.attr({
        fill: '#FFFFFF'
    });
    var path8 = paper.path('M796.648,187.416c0,2.75-2.25,5-5,5h-208 c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h208c2.75,0,5,2.25,5,5V187.416z');
    path8.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '0.7087',
        'stroke-miterlimit': '3.8637'
    });
    var p2 = paper.multitext(685, 140, 150, 'TMA 01 : your first tutor-marked assignment (TMA) focuses on the PDP strand of the module.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var path9 = paper.path('M578.648,156.749c-61.16,5.109-86.646,59.845-139.267,74.005');
    path9.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '2.2677'
    });
    var poly1 = paper.polyline(426.814, 233.249, 442.969, 222.328, 440.289, 230.426, 445.993, 236.764);
    poly1.attr({
        fill: '#B1B3B4'
    });
    group_tma01 = paper.g(path7, path8, p2, path9, poly1);
    group_tma01.attr({
        id: 'gid21',
        transform: 't -2 107',
        visibility: 'hidden'
    });
    // EMA text box overlay
    var path7 = paper.path('M280.647,231.415c0,2.75-2.25,5-5,5h-270c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h270 c2.75,0,5,2.25,5,5V231.415z');
    path7.attr({
        fill: '#FFFFFF'
    });
    var path8 = paper.path('M280.647,231.415c0,2.75-2.25,5-5,5h-270 c-2.75,0-5-2.25-5-5v-61.333c0-2.75,2.25-5,5-5h270c2.75,0,5,2.25,5,5V231.415z');
    path8.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '0.7087',
        'stroke-miterlimit': '3.8637'
    });
    var p2 = paper.multitext(130, 184, 180, 'EMA : your end-of-module assessment (EMA) draws together all three strands of the module and takes the place of an exam.') .attr({
        font: '12px Verdana',
        textAnchor: 'middle',
        fill: '#555'
    });
    var path9 = paper.path('M232.648,236.415c4.667,12.002,18.718,33.549,44.667,48.001 c22.791,12.693,57.566,27.883,92.009,28.5');
    path9.attr({
        fill: 'none',
        stroke: '#9C9E9F',
        'stroke-width': '2.2677'
    });
    var poly1 = paper.polyline(385.314, 312.083, 363.147, 322.215, 368.121, 312.786, 362.395, 303.795);
    poly1.attr({
        fill: '#B1B3B4'
    });
    group_ema = paper.g(path7, path8, p2, path9, poly1);
    group_ema.attr({
        id: 'gid25',
        transform: 't 5 104',
        visibility: 'hidden'
    });
    // Overview text
    t1 = paper.text(1, 90, 'TMA 01, TMA 02, iCMA 41, iCMA 42 and the EMA') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t2 = paper.text(1, 110, 'The T176 assessments are very important') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t3 = paper.text(1, 130, 'for successful completion of the') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t4 = paper.text(1, 150, ' module. They will support your') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t5 = paper.text(1, 170, 'learning and provide') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t6 = paper.text(1, 190, 'feedback to help you') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t7 = paper.text(1, 210, 'measure your progress') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    t8 = paper.text(1, 230, 'on the module.') .attr({
        'style': 'font: 400 12px Verdana',
        'fill': '#555'
    });
    group_over = paper.g(t1, t2, t3, t4, t5, t6, t7, t8);
    group_over.attr({
        id: 'gid26',
        visibility: 'hidden'
    });
	
    // Control code below here , used for click events tabbing and reordering DOM to display correct svg group
    //Attach <a> tags to tabbable elements
	
    // detect when a tag gets focus
    $('a') .on('focusin', function () {
		var box = this.getBBox();
		var rect_tab = paper.rect(box.x-5, box.y-5, box.width+10, box.height+10);
		rect_tab.attr({
			class: 'rect_tab',
			fill: 'none',
			stroke: '#9C9E9F',
			'stroke-width': '3px'
		});
        if ($(this) .attr('class') .indexOf('overlay') !== - 1) {
            $('.overlay') .trigger('mouseenter');
        }
    });

    // detect when a tag loses focus	
    $('a') .on('focusout', function () {
        $('.rect_tab').remove();
        if ($(this) .attr('class') .indexOf('overlay') !== - 1) {
            $('.overlay') .trigger('mouseleave');
        }
    });
    // click event handler for info circle clicks
    $('.infocircles').on('click', function (e) {
        if ($(this) .attr('id') !== 'gid13' && $(this) .attr('class') !== 'reorder') {
            if (e.type === 'click') {
                this.parentNode.appendChild(this);
            }
            manageTabLayers($(this));
        }
		$('.rect_tab').remove();
		e.preventDefault();
        e.stopPropagation();
    });
    // keydown handler for text that has an action asscociated with it.
    $('.actiontext').on('keydown', function (e) {
        if (e.which == 13) {
            if ($(this) .attr('class') === 'actiontext action1') {
                $('#gid18') .appendTo($('#gid18') .parent());
                manageTabLayers($('#gid18'));
				e.preventDefault();
            } else if ($(this) .attr('class') === 'actiontext action2') {
                $('#gid19') .appendTo($('#gid19') .parent());
                manageTabLayers($('#gid19'));
				e.preventDefault();
            } else if ($(this) .attr('class') === 'actiontext action3') {
                $('#gid20') .appendTo($('#gid20') .parent());
                manageTabLayers($('#gid20'));
				e.preventDefault();
            } else {
                $($(this) .parent()) .parent() .append($(this) .parent());
                manageTabLayers($(this) .parent());
            }
			if ($(this) .parent().attr('id') !== 'gid12'){
				$('#gid12 .actiontext') .attr('visibility', 'hidden');
			}
        } else if (e.which == 27) {
            $('.reorder') .trigger('click')
        }
		$('.rect_tab').remove();
        e.stopPropagation();
    });
    // reorder dom in group id order
    $('.reorder, #gid11') .on('click keydown', function (e) {
        if (this.id !== 'gid13' && this.className !== 'reorder') {
            if (e.type === 'click') {
                if ($('svg g')) {
                    $('svg g a') .attr('visibility', 'visible');
                    manageTabLayers($('#gid11'));
                    $('svg g') .sort(sortAlphaReverse) .appendTo('svg');
                    $('#gid21, #gid22, #gid23, #gid24, #gid25, #gid26') .sort(sortAlphaReverse) .appendTo('svg');
					$('#gid12 .actiontext') .attr('visibility', 'visible');
                }
            } else {
                if (e.which == 13) {
                    if ($('svg g')) {
                        $('svg g a') .attr('visibility', 'visible');
                        manageTabLayers($('#gid11'));
                        $('svg g') .sort(sortAlphaReverse) .appendTo('svg');
                        $('#gid21, #gid22, #gid23, #gid24, #gid25, #gid26') .sort(sortAlphaReverse) .appendTo('svg');
                        $('#gid12 .actiontext') .attr('visibility', 'visible');
                    }
                }
            }
        }
		$('.rect_tab').remove();
        e.stopPropagation();
    });
    // if group 13 we need to work out angle clicked on to determine what information to display
    $('#gid13') .on('click', function (e) {
        var parentOffset = $(this) .offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        a = getAngle(relX, relY);
        if (a > 90 && a < 210) {
            $('#gid19') .appendTo($('#gid19') .parent());
            manageTabLayers($('#gid19'));
        } else if (a > 210 && a < 330) {
            $('#gid18') .appendTo($('#gid18') .parent());
            manageTabLayers($('#gid18'));
        } else {
            $('#gid20') .appendTo($('#gid20') .parent());
            manageTabLayers($('#gid20'));
        }
        $('#gid12 .actiontext') .attr('visibility', 'hidden');
		e.preventDefault();
        e.stopPropagation();
		$('.rect_tab').remove();
    });
    $('#gid14, #gid13') .hover(function () {
        this.style.opacity = '1';
    }, function () {
        this.style.opacity = '1';
    }
    );
    var saved_fill = $('#gid12 circle') .attr('fill');
    $('#gid12') .hover(function () {
        $('#gid12 circle') .attr('fill', 'white')
    }, function () {
        $('#gid12 circle') .attr('fill', saved_fill)
    }
    );
    // handler for purple inner circle
    $('.purple-click') .on('click keydown', function (e) {
        if (e.type === 'click') {
            $('#gid15') .appendTo($('#gid15') .parent());
            manageTabLayers($('#gid15'));
        } else {
            if (e.which == 13) {
                $('#gid15') .appendTo($('#gid15') .parent());
                manageTabLayers($('#gid15'));
            } else if (e.which == 27) {
                $('.reorder') .trigger('click')
            }
        }
		$('.rect_tab').remove();
        e.stopPropagation();
    });
    // handler for pink inner circle
    $('.pink-click') .on('click keydown', function (e) {
        if (e.type === 'click') {
            $('#gid16') .appendTo($('#gid16') .parent());
            manageTabLayers($('#gid16'));
        } else {
            if (e.which == 13) {
                $('#gid16') .appendTo($('#gid16') .parent());
                manageTabLayers($('#gid16'));
            } else if (e.which == 27) {
                $('.reorder') .trigger('click')
            }
        }
		$('.rect_tab').remove();
        e.stopPropagation();
    });
    // handler for blue inner circle
    $('.blue-click') .on('click keydown', function (e) {
        if (e.type === 'click') {
            $('#gid17') .appendTo($('#gid17') .parent());
            manageTabLayers($('#gid17'));
        } else {
            if (e.which == 13) {
                $('#gid17') .appendTo($('#gid17') .parent());
                manageTabLayers($('#gid17'));
            } else if (e.which == 27) {
                $('.reorder') .trigger('click')
            }
        }
		$('.rect_tab').remove();
        e.stopPropagation();
    });
    // show overlay 
    $('.overlay') .on('mouseenter', function () {
		$('svg g') .attr('aria-live', 'off');
        group_tma01.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
        group_tma02.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
        group_icma41.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
        group_icma42.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
        group_ema.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
        group_over.attr({
            visibility: 'visible',
			'aria-live': 'polite'
        });
		
		
    });
    $('.overlay') .on('mouseleave', function () {
        group_tma01.attr({
            visibility: 'hidden'
        });
        group_tma02.attr({
            visibility: 'hidden'
        });
        group_icma41.attr({
            visibility: 'hidden'
        });
        group_icma42.attr({
            visibility: 'hidden'
        });
        group_ema.attr({
            visibility: 'hidden'
        });
        group_over.attr({
            visibility: 'hidden'
        });
		$('svg g') .attr('aria-live', 'off');
    });
    // order groups by id on startup
    $('svg g') .sort(sortAlphaReverse) .appendTo('svg');
    $('#gid21, #gid22, #gid23, #gid24, #gid25, #gid26') .sort(sortAlphaReverse) .appendTo('svg');
	$('desc').remove();

    // manage tab layers
    manageTabLayers($('#gid11'));
});
