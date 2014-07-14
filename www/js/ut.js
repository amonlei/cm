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
    'd2','f0', // 总电压 3，4
    '00','01','86','a0', // 电流 5,6,7,8
    '60', // 剩余电量% 9
    '01', // 故障 10
    '80', // 扩展故障 11
    '03', // 运行状态 12
    '0c','e4', // 电芯1电压 13,14
    '0c','e4', // 电芯2电压 15,16
    '0c','e4', // 电芯3电压 17,18
    '0c','e4', // 电芯4电压 19,20
    '0c','e4', // 电芯5电压 21,22
    '0c','e4', // 电芯6电压 23,24
    '0c','e4', // 电芯7电压 25,26
    '0c','e4', // 电芯8电压 27,28
    '0c','e4', // 电芯9电压 29,30
    '0c','e4', // 电芯10电压 31,32 
    '0c','e4', // 电芯11电压 33,34
    '0c','e4', // 电芯12电压 35,36
    '0c','e4', // 电芯13电压 37,38
    '0c','e4', // 电芯14电压 39,40
    '0c','e4', // 电芯15电压 41,42
    '0c','e4', // 电芯16电压 43,44
    '0c','e4', // 电芯17电压 45,46
    '0c','e4', // 电芯18电压 47,48
    '0c','e4', // 电芯19电压 49,50
    '0c','e4', // 电芯20电压 51,52
    '0c','e4', // 电芯21电压 53,54
    '0c','e4', // 电芯22电压 55,56
    '0c','e4', // 电芯23电压 57,58
    '0c','e4', // 电芯24电压 59,60

    '01','23','01','2c', // 探温头1 温度（整数，小数）61,62,  63,64
    '01','23','01','2c', // 探温头2 温度（整数，小数）65,66,  67,68
    '01','23','01','2c', // 探温头3 温度（整数，小数）69,70,  71,72
    '01','23','01','2c', // 探温头4 温度（整数，小数）73,74,  75,76
    '01','23','01','2c', // 探温头5 温度（整数，小数）77,78,  79,80
    '01','23','01','2c', // 探温头6 温度（整数，小数）81,82,  83,84

    '00','23','00','2c', // bcs 温度（整数，小数）85,86,  87,88
    '00','01','86','a0', // 总电量 89,90,  91,92
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
    eval("assert.equal(bcs.tmp" + i + ", '291.300','tmp" + i + " error')  ")
  }

  assert.equal(bcs.total_p, 100000,'total_p error')

});

QUnit.test( "2. $bcu => 不正确的buffer 长度不够 undefined", function( assert ) {
  assert.ok($bcs([]) == undefined)
  assert.ok($bcs(undefined) == undefined)
});