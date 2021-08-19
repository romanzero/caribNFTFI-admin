/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */

function set_pie_chart(pie_element_id, name_arr, value_arr, title="", subtitle=""){
    if (typeof echarts == 'undefined') {
        console.warn('Warning - echarts.min.js is not loaded.');
        return;
    }

    var pie_basic_element = document.getElementById(pie_element_id);

    if (pie_basic_element) {
        var pie_basic = echarts.init(pie_basic_element);

        chart_value_arr = [];
        for(index = 0; index < name_arr.length;index++) {
            chart_value_arr.push({value:value_arr[index], name:name_arr[index]});  
        }

        pie_basic.setOption({
            color: [
                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
            ],

            textStyle: {
                fontFamily: 'Noto Sans JP',
                fontSize: 13
            },

            title: {
                text: title,
                subtext: subtitle,
                left: 'center',
                textStyle: {
                    fontSize: 17,
                    fontWeight: 500
                },
                subtextStyle: {
                    fontSize: 12
                }
            },

            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.75)',
                padding: [10, 15],
                textStyle: {
                    fontSize: 13,
                    fontFamily: 'Noto Sans JP'
                },
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            legend: {
                orient: 'horizontal',
                top: 'bottom',
                left: 'center',
                data: name_arr,
                itemHeight: 8,
                itemWidth: 8
            },

            series: [{
                name: 'Browsers',
                type: 'pie',
                radius: '70%',
                center: ['50%', '57.5%'],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#fff'
                    }
                },
                data: chart_value_arr
            }]
        });
    }

    var triggerChartResize = function() {
        pie_basic_element && pie_basic.resize();
    };

    var sidebarToggle = document.querySelector('.sidebar-control');
    sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

    var resizeCharts;
    window.addEventListener('resize', function() {
        clearTimeout(resizeCharts);
        resizeCharts = setTimeout(function () {
            triggerChartResize();
        }, 200);
    });
}

var RSwal = null;

var DatatableBasic = function() {
    var _componentDatatableBasic = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        $.extend( $.fn.dataTable.defaults, {
            bFilter: false,
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            language: {
                "oPaginate": {
                    "sFirst": "First",
                    "sPrevious": "Previous",
                    "sNext": "Next",
                    "sLast": "Last"
                },
                "sInfo": "Display from _START_ to _END_ in _TOTAL_",
                "sLengthMenu": "Display _MENU_ items",
                "sProcessing": "Processing...",
                "sSearch": "Search:",
                "loadingRecords": "Loading...",
                "zeroRecords": "No Data",
                "infoEmpty": "Display from 0 to 0 in 0",
                "infoFiltered": "（全 _MAX_ 件より抽出）"
            },
        });

    };

    return {
        init: function() {
            _componentDatatableBasic();
        }
    }
}();


document.addEventListener('DOMContentLoaded', function() {
    DatatableBasic.init();
});