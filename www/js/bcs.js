$bcs_status_c2v = {
  '00': '正常主机模式',
  '01': '正常从机模式',
  '02': '设置调试模式',
  '03': '关机模式'
}

$bcs_error_c2v = {
  '00': '无故障',
  '01': '电池过压',
  '02': '电池欠压',
  '04': 'SOC低',
  '08': '过流',
  '10': '温度过低',
  '20': '温度过高',
  '40': '电芯接头松',
  '80': '不平衡'
}

$bcs_ext_error_c2v = {
  '00': '无故障',
  '01': '欠费保护',
  '02': 'GPS故障',
  '04': '电池寿命故障',
  '08': '端头故障',
  '10': '存储器故障',
  '20': '蓝牙故障',
  '40': '实时时钟故障',
  '80': 'BCU电源故障'
}

$bcs = function(bf) {
  if(bf != undefined && bf.length == 96) {
    return {
      total_vf: parseInt(bf[3] + bf[2],16),
      total_ec: parseInt(bf[7] + bf[6] + bf[5] + bf[4],16),
      total_pp: parseInt(bf[8],16),
      error_code: parseInt(bf[9],16),
      ext_error_code: parseInt(bf[10],16),
      status_code: parseInt(bf[11],16),
      cell1_vf: parseInt(bf[13] + bf[12],16),
      cell2_vf: parseInt(bf[15] + bf[14],16),
      cell3_vf: parseInt(bf[17] + bf[16],16),
      cell4_vf: parseInt(bf[19] + bf[18],16),
      cell5_vf: parseInt(bf[21] + bf[20],16),
      cell6_vf: parseInt(bf[23] + bf[22],16),
      cell7_vf: parseInt(bf[25] + bf[24],16),
      cell8_vf: parseInt(bf[27] + bf[26],16),
      cell9_vf: parseInt(bf[29] + bf[28],16),
      cell10_vf: parseInt(bf[31] + bf[30],16),
      cell11_vf: parseInt(bf[33] + bf[32],16),
      cell12_vf: parseInt(bf[35] + bf[34],16),
      cell13_vf: parseInt(bf[37] + bf[36],16),
      cell14_vf: parseInt(bf[39] + bf[38],16),
      cell15_vf: parseInt(bf[41] + bf[40],16),
      cell16_vf: parseInt(bf[43] + bf[42],16),
      cell17_vf: parseInt(bf[45] + bf[44],16),
      cell18_vf: parseInt(bf[47] + bf[46],16),
      cell19_vf: parseInt(bf[49] + bf[48],16),
      cell20_vf: parseInt(bf[51] + bf[50],16),
      cell21_vf: parseInt(bf[53] + bf[52],16),
      cell22_vf: parseInt(bf[55] + bf[54],16),
      cell23_vf: parseInt(bf[57] + bf[56],16),
      cell24_vf: parseInt(bf[59] + bf[58],16),
      tmp1: parseInt(bf[61] + bf[60],16) + '.' + parseInt(bf[63] + bf[62],16),
      tmp2: parseInt(bf[65] + bf[64],16) + '.' + parseInt(bf[67] + bf[66],16),
      tmp3: parseInt(bf[69] + bf[68],16) + '.' + parseInt(bf[71] + bf[70],16),
      tmp4: parseInt(bf[73] + bf[72],16) + '.' + parseInt(bf[75] + bf[74],16),
      tmp5: parseInt(bf[77] + bf[76],16) + '.' + parseInt(bf[79] + bf[78],16),
      tmp6: parseInt(bf[81] + bf[80],16) + '.' + parseInt(bf[83] + bf[82],16),

      bcs_tmp: parseInt(bf[85] + bf[84],16) + '.' + parseInt(bf[87] + bf[86],16),
      total_p: parseInt(bf[91] + bf[90] + bf[89] + bf[88],16),
      created_at: new Date()
    }  
  } else {
    return undefined;
  }
  
}