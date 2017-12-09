window.getDemoAdTag = function() {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<VAST version="2.0">' +
        '<Ad id="601364">' +
          '<InLine>' +
            '<AdSystem>VPAID Example</AdSystem>' +
            '<AdTitle>VAST 2.0 Instream Test 1</AdTitle>' +
            '<Description>VAST 2.0 Instream Test 1</Description>' +
            '<Creatives>' +
              '<Creative AdID="601364">' +
                '<Linear>' +
                  '<Duration>00:00:30</Duration>' +
                  '<AdParameters>' +
                    '<![CDATA[' +
                      '{' +
                        '"videoURL": "http://cdn.visiblemeasures.com/ad_assets/p/demo/ComputerFair1982.mp4",' +
                        '"clickThrough": "http://www.yahoo.com/"' +
                      '}' +
                    ']]>' +
                  '</AdParameters>' +
                  '<MediaFiles>' +
                    '<MediaFile apiFramework="VPAID" width="640" height="360" type="application/javascript" delivery="progressive">' +
                      'http://localhost:8080/demo.bundle.js' +
                    '</MediaFile>' +
                  '</MediaFiles>' +
                '</Linear>' +
              '</Creative>' +
            '</Creatives>' +
          '</InLine>' +
        '</Ad>' +
    '</VAST>'
  );
};