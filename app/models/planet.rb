class Planet < ApplicationRecord
  enum size: {
    dwarf:        0, # asteroid <        dwarf          <  mercury
    sub_earth:    1, # mercury  <      sub_earth        <  earth
    earth_size:   2, #             earth_size ~= earth
    super_earth:  3, # earth    <  super_earth (rocky)  <  neptune
    sub_saturn:   4, # neptune  <= sub_saturn (gaseous) <  saturn
    saturn_size:  5, #             saturn_size ~= saturn
    super_saturn: 6, # saturn   <     super_saturn      <= planetar
    planetar:     7  # jupiter  <       planetar        <  sun
  }
end
