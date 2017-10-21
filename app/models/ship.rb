class Ship < ApplicationRecord
  belongs_to :user
  belongs_to :nation, optional: true

  # not to be confused with :type
  enum size: {
    personal:   0, # space motorcycle - e.g. Viper (BSG), X-Wing (Star Wars)
    sedan:      1, # space minivan - e.g. Imperial Shuttle (Star Wars)
    transport:  2, # space 18-wheeler - e.g. Serenity (Firefly), Millenium Falcon (Star Wars)
    frigate:    3, # space cargo ship - e.g. I have no examples... picture a freighter in space
    carrier:    4, # space aircraft carrier - e.g. Enterprise (Star Trek), Destroyer (Star Wars)
    giant:      5, # ridiculously big - e.g. Borg Tactical Cube (Star Trek), Trade Federation Battleship (Star Wars)
    supergiant: 6  # impossibly huge - e.g. Death Star (Star Wars), Executor (Star Wars), your mom (real life)
  }
end
