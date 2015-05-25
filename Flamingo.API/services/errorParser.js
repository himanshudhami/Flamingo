'use strict';

module.exports = function(body) {
	if(body && (body.ExceptionMessage || body.StackTrace || body.InnerException))
	{
		var error = {};
		error.friendlyMessage = body.InnerException ? body.InnerException.Message : body.Message;
		error.message = body.InnerException ? body.InnerException.Message : body.ExceptionMessage;
		error.stack = body.InnerException ? (body.InnerException.StackTracebody || body.InnerException.StackTraceString) : body.StackTrace || body.StackTraceString;
		throw error;
	}
};