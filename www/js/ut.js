function log(m) {
  console.log(m)
}

// QUnit.test( "0. $bcu => 正确的buffer", function( assert ) {
//   assert.ok(true)
// })

QUnit.test( "1. $bcu => 正确的buffer", function( assert ) {
  log('1.')
  var buffers = [
    '3c','3c', //开头 1,2
    'f0','d2', // 总电压 3，4
    'a0','86','01','00', // 电流 5,6,7,8
    '60', // 剩余电量% 9
    '01', // 故障 10
    '80', // 扩展故障 11
    '03', // 运行状态 12
    'e4','0c', // 电芯1电压 13,14
    'e4','0c', // 电芯2电压 15,16
    'e4','0c', // 电芯3电压 17,18
    'e4','0c', // 电芯4电压 19,20
    'e4','0c', // 电芯5电压 21,22
    'e4','0c', // 电芯6电压 23,24
    'e4','0c', // 电芯7电压 25,26
    'e4','0c', // 电芯8电压 27,28
    'e4','0c', // 电芯9电压 29,30
    'e4','0c', // 电芯10电压 31,32 
    'e4','0c', // 电芯11电压 33,34
    'e4','0c', // 电芯12电压 35,36
    'e4','0c', // 电芯13电压 37,38
    'e4','0c', // 电芯14电压 39,40
    'e4','0c', // 电芯15电压 41,42
    'e4','0c', // 电芯16电压 43,44
    'e4','0c', // 电芯17电压 45,46
    'e4','0c', // 电芯18电压 47,48
    'e4','0c', // 电芯19电压 49,50
    'e4','0c', // 电芯20电压 51,52
    'e4','0c', // 电芯21电压 53,54
    'e4','0c', // 电芯22电压 55,56
    'e4','0c', // 电芯23电压 57,58
    'e4','0c', // 电芯24电压 59,60

    '23','00','2c','00', // 探温头1 温度（整数，小数）61,62,  63,64
    '23','00','2c','00', // 探温头2 温度（整数，小数）65,66,  67,68
    '23','00','2c','00', // 探温头3 温度（整数，小数）69,70,  71,72
    '23','00','2c','00', // 探温头4 温度（整数，小数）73,74,  75,76
    '23','00','2c','00', // 探温头5 温度（整数，小数）77,78,  79,80
    '23','00','2c','00', // 探温头6 温度（整数，小数）81,82,  83,84

    '23','00','2c','00', // bcs 温度（整数，小数）85,86,  87,88
    'a0','86','01','00', // 总电量 89,90,  91,92
    '01','01', // CRC校验 93,94
    '3e','3e' // 尾部 95, 96

  ]
  // assert.equal(parseInt('0123',16),291)
  // assert.equal(parseInt('012c',16),300)  
  assert.equal(buffers.length,96, 'inited_buffers.length != 96')
  var bcs = $bcs(buffers)
  assert.equal(bcs.total_vf, 54000,'total_vf error')
  assert.equal(bcs.total_ec, 100000,'total_ec error')
  assert.equal(bcs.total_pp, 96,'total_pp error')
  assert.equal(bcs.error_code, 01,'error_code error')
  assert.equal(bcs.ext_error_code, 128,'ext_error_code error')
  assert.equal(bcs.status_code, 03,'status_code error')
  for(var i = 1; i < 25; i ++) {
    eval("assert.equal(bcs.cell" + i + "_vf, 3300,'cell" + i + "_vf error')  ")
  }
  
  for(var i = 1; i < 7; i ++) {
    eval("assert.equal(bcs.tmp" + i + ", '35.44','tmp" + i + " error')  ")
  }
  assert.equal(bcs.bcs_tmp, '35.44','bcs_tmp error')
  assert.equal(bcs.total_p, 100000,'total_p error')

});

QUnit.test( "2. $bcu => 不正确的buffer 长度不够 undefined", function( assert ) {
  assert.ok($bcs([]) == undefined)
  assert.ok($bcs(undefined) == undefined)
});