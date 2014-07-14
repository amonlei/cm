$bcs = function(bf) {
  if(bf != undefined && bf.length == 96) {
    return {
      total_vf: parseInt(bf[2] + bf[3],16),
      total_ec: parseInt(bf[4] + bf[5] + bf[6] + bf[7],16),
      total_pp: parseInt(bf[8],16),
      error_code: parseInt(bf[9],16),
      ext_error_code: parseInt(bf[10],16),
      status_code: parseInt(bf[11],16),
      cell1_vf: parseInt(bf[12] + bf[13],16),
      cell2_vf: parseInt(bf[14] + bf[15],16),
      cell3_vf: parseInt(bf[16] + bf[17],16),
      cell4_vf: parseInt(bf[18] + bf[19],16),
      cell5_vf: parseInt(bf[20] + bf[21],16),
      cell6_vf: parseInt(bf[22] + bf[23],16),
      cell7_vf: parseInt(bf[24] + bf[25],16),
      cell8_vf: parseInt(bf[26] + bf[27],16),
      cell9_vf: parseInt(bf[28] + bf[29],16),
      cell10_vf: parseInt(bf[30] + bf[31],16),
      cell11_vf: parseInt(bf[32] + bf[33],16),
      cell12_vf: parseInt(bf[34] + bf[35],16),
      cell13_vf: parseInt(bf[36] + bf[37],16),
      cell14_vf: parseInt(bf[38] + bf[39],16),
      cell15_vf: parseInt(bf[40] + bf[41],16),
      cell16_vf: parseInt(bf[42] + bf[43],16),
      cell17_vf: parseInt(bf[44] + bf[45],16),
      cell18_vf: parseInt(bf[46] + bf[47],16),
      cell19_vf: parseInt(bf[48] + bf[49],16),
      cell20_vf: parseInt(bf[50] + bf[51],16),
      cell21_vf: parseInt(bf[52] + bf[53],16),
      cell22_vf: parseInt(bf[54] + bf[55],16),
      cell23_vf: parseInt(bf[56] + bf[57],16),
      cell24_vf: parseInt(bf[58] + bf[59],16),
      tmp1: parseInt(bf[60] + bf[61],16) + '.' + parseInt(bf[62] + bf[63],16),
      tmp2: parseInt(bf[64] + bf[65],16) + '.' + parseInt(bf[66] + bf[67],16),
      tmp3: parseInt(bf[68] + bf[69],16) + '.' + parseInt(bf[70] + bf[71],16),
      tmp4: parseInt(bf[72] + bf[73],16) + '.' + parseInt(bf[74] + bf[75],16),
      tmp5: parseInt(bf[76] + bf[77],16) + '.' + parseInt(bf[78] + bf[79],16),
      tmp6: parseInt(bf[80] + bf[81],16) + '.' + parseInt(bf[82] + bf[83],16),

      bcs_tmp: parseInt(bf[84] + bf[85],16) + '.' + parseInt(bf[86] + bf[87],16),
      total_p: parseInt(bf[88] + bf[89] + bf[90] + bf[91],16)
    }  
  } else {
    return undefined;
  }
  
}