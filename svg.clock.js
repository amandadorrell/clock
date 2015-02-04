/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  var i, settings
  /* set defaults */
  settings = {
    plate:    '#ffffff'
  , timelyBlue: '#0098cb'
  }
  /* merge options */
  options = options || {}
  for (i in options)
    settings[i] = options[i]
  
  /* store full rotations */
  this.full = {
    hours:    0
  , minutes:  0
  , seconds:  0
  }
  
  /* store current time */
  this.time = {
    hours:    0
  , minutes:  0
  , seconds:  0
  }
  
  /* create nested svg element */
  this.constructor.call(this, SVG.create('svg'))
  
  /* set attributes */
  this.viewbox(0, 0, 100, 100)
  this.size(size, size)
  

  /* create plate and plate border */
  this.plateBorder = this.ellipse (86, 86)
    .move(7, 7)
    .fill(settings.plate)
    .stroke({ color: '#0098cb', opacity: 1, width: 14 })
  
  /* center point of clock */
  this.spot = this.ellipse (12,12)
    .move(44, 44)
    .fill(settings.timelyBlue)
  
  /* draw hour pointer */
  this.hours = this.rect(12,20)
    .move(44,30)
    .fill(settings.timelyBlue)
  
  /* draw minute pointer */
  this.minutes = this.rect(12,32)
    .move(44,18)
    .fill(settings.timelyBlue)
  
  /* set pointers without animation */
  this.update(0)
}

SVG.Clock.prototype = new SVG.Container

// Add time management methods to clock
SVG.extend(SVG.Clock, {
  // Start ticking
  start: function() {
    var self = this
    
    setInterval(function() {
      self.update()
    }, 1000)
    
    return this
  }
  // Update time
, update: function(duration) {
    /* get current time */
    var time = new Date()
    
    /* ensure duration */
    if (duration == null)
      duration = 300
    
    /* set all pointers */
    this
      .setHours(time.getHours(), time.getMinutes())
      .setMinutes(time.getMinutes(), duration)
    
    return this
  }
  // Set hour
, setHours: function(hours, minutes) {
    /* store hour */
    this.time.hours = hours
    
    /* set pointer */
    this.hours
      .rotate((360 / 12 * ((hours + minutes / 60) % 12)), 50, 50)
    
    return this
  }
  // Set minute
, setMinutes: function(minutes, duration) {
    if (minutes == this.time.minutes)
      return this
    
    /* store minutes */
    this.time.minutes = minutes
    
    /* register a full circle */
    if (minutes == 0)
      this.full.minutes++
    
    /* calculate rotation */
    var deg = this.full.minutes * 360 + 360 / 60 * minutes
    
    /* animate if duration is given */
    if (duration)
      this.minutes
        .animate(duration, SVG.easing.elastic)
        .rotate(deg, 50, 50)
    else
      this.minutes
        .rotate(deg, 50, 50)
    
    return this
  }

  
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method 
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }
  
})
