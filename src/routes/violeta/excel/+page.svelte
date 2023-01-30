<script>
  import Excel from "exceljs";
  import { Button } from "@specialdoom/proi-ui";

  let structure = {};


  let file;

  const handleFile = () => {
    console.log(file.files);

    const wb = new Excel.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file.files[0]);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        let ws = workbook.getWorksheet("Hoja 1");
        ws.eachRow((row, rowIndex) => {
          let [_, fecha, cuenta, denominacion, debe, haber, ...resto] = row.values;

          if (rowIndex !== 1 && fecha) {
            if (!structure[fecha]) {
              structure[fecha] = {};
            }
            if (!structure[fecha][cuenta]) {
              structure[fecha][cuenta] = {
                "cuenta": cuenta,
                "denominacion": denominacion,
                debe: 0,
                haber: 0,
                diff: 0
              };
            }

            structure[fecha][cuenta].debe += debe;
            structure[fecha][cuenta].haber += haber;
            structure[fecha][cuenta].diff = structure[fecha][cuenta].debe - structure[fecha][cuenta].haber;
            if (denominacion === "Caja Central"){
              console.log(structure[fecha][cuenta])
            }
          }
        });
        let new_ws = workbook.addWorksheet("resumenes");
        let rows = [];
        let index = 1;
        for (const mes in structure) {
          let today = new Date(mes);
          today.setDate(today.getDate() + 1);
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();
          const formattedToday = dd + "/" + mm + "/" + yyyy;

          rows.push([`N° ${index}`, formattedToday, "movimiento del mes", ""]);
          index += 1
          for (const cuen in structure[mes]) {
            let { cuenta, fecha, denominacion, haber, debe, diff } = structure[mes][cuen];
            rows.push([cuenta, denominacion, diff > 0 ? diff : 0, diff < 0 ? diff*-1 : 0]);
          }
          rows.push(["", "", "", ""]);
        }
        new_ws.insertRows(1, rows);

        wb.xlsx.writeBuffer({
          base64: true
        }).then(function(xls64) {
          // build anchor tag and attach file (works in chrome)
          var a = document.createElement("a");
          var data = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

          var url = URL.createObjectURL(data);
          a.href = url;
          a.download = "export.xlsx";
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            },
            0);
        });
      });
    };
  };

</script>


<div class="h-screen w-screen flex justify-center items-center flex-col gap-2">
  <input bind:this={file} name="excel" type="file">
  <Button on:click={handleFile}>Generar resumen</Button>
</div>

