/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
    document.querySelector(".showResults").addEventListener("click", showResults);
    // See load and submit funcions at python script
    var handlerUrlAnalytics = runtime.handlerUrl(element, "load_analytics");
  
    // On document load
    $(function ($) {
      $.ajax({
        type: "POST",
        url: handlerUrlAnalytics,
        data: "null", // No return needed.
        dataType: "json",
        success: function (data) {
          //add a header to the web page
          var header = "";
          header =
            '<div class="bg-primary  d-flex justify-content-center"> <h2 class="h1 text-white">Resultados Tests Herrmann V2</h2> </div>';
          $("#analytics-header").append(header);
          //show database results (student id, date, test name and test result) in an HTML table
          data.map((student) => {
            var html = "";
            /*if (student.test == 1) test_name = "Kolb"
                      if (student.test == 2) test_name = "Hermann"
                      if (student.test == 3) test_name = "Inteligencias Multiples"
                      if (student.test == 4) test_name = "Honey-Alonso"
                      if (student.test == 5) test_name = "Felder Silverman"
                      if (student.test == 6) test_name = "Bandler & Grinder"*/
            if (student.test == 7) test_name = "Herrmann_v2";
  
            html += "<tr>";
            html += "<td>" + student.user_id + "</td>";
            //html += '<td>' + student.fecha + '</td>'
            html += "<td>" + test_name + "</td>";
            html += "<td>" + student.result.result.strQuadrantH + "</td>";
            html += "</tr>";
            $("#analytics-table").append(html);
          });
        },
      });
    });
  
    
    function showResults() {
      i=0;
      $.ajax({
        type: "POST",
        url: handlerUrlAnalytics,
        data: "null", // No return needed.
        dataType: "json",
        success: function (data) {
          //show database results (student id, date, test name and test result) in an HTML table
          let d = 0, c = 0, b = 0, a = 0,total=0, dp = 0, cp = 0, bp = 0, ap = 0;
          let res = [];
          //console.log(student.result.result.strQuadrantH)
          data.map((student) => {
            let x = student.result.result.strQuadrantH ;
            res.push(x);
            console.log(res[i])
  
            
            
            if (res[i] == 'Logico-Matemático') {
              a++;
            } else if (res[i] == 'Organizado-Analista') {
              b++;
            } else if (res[i]== "Emocional-Sensitivo") {
              c++;
            } else if (res[i] == 'Intuitivo-Imaginativo') {
              d++;
            }
            i++;
            total=a+b+c+d;
            ap=100*(a/total);
            bp=100*(b/total);
            cp=100*(c/total);
            dp=100*(d/total);
            ap=ap.toFixed(2);
            bp=bp.toFixed(2);
            cp=cp.toFixed(2);
            dp=dp.toFixed(2);

          });
  
          var Chartgrafico = {
            type: "pie",
            data: {
              datasets: [{
                data: [ap,bp,cp,dp],
                  backgroundColor: [
                      "#0870bc", "#0e2f57", "#19ebff", "#60111a",
                      ],
                }],
              labels: ["Lógico-Matemático","Organizado-Analista"," Emocional-Sensitivo","Intuitivo-Imaginativo"]
              
               },
            options: {
              responsive: true,
            }
          }
  
          var grafica = document.getElementById("grafico").getContext("2d");
          window.pie = new Chart(grafica, Chartgrafico);
          
          
  
          var Chartgrafico2 = {
            type: "bar",
            data: {
              datasets: [{
                data: [ap,bp,cp,dp],
                  backgroundColor: [
                      "#0870bc", "#0e2f57", "#19ebff", "#60111a",
                  ],
                }],
                
  
                labels: ["Ló-Ma "+ap+"%","Or-An "+bp+"%"," Em-Se "+cp+"%","In-Im "+dp+"%"]
              
            },
            options: {
              responsive: true,
              animateRotate: true,
              percentageInnerCutout: 0,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Total Estudiantes",
                    }
                  } ]
              },
              legend: {
                display: false, //ELiminar el label "undefined"
              }
            }
          }
  
          var grafica2 = document.getElementById("grafico2").getContext("2d");
          window.bar = new Chart(grafica2, Chartgrafico2);
  
  
  
          var texto = "Total de Estudiantes = ";
          var objetivo = document.getElementById("resultado");
          objetivo.innerHTML = texto + res.length;
        },
      });
    }
  }
  
