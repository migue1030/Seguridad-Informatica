exports.sendSuccess = (res, data) => {
    res.status(200).json({ success: true, data });
  };
  
  exports.sendCreated = (res, data) => {
    res.status(201).json({ success: true, data });
  };
  
  exports.sendNotFound = (res, message) => {
    res.status(404).json({ success: false, message });
  };
  
  exports.sendError = (res, message, error) => {
    console.error(error);
    res.status(500).json({ success: false, message });
  };
  