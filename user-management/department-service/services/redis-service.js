module.exports = {
    redis: function () {
        let number_of_args = arguments.length;
        let redis_command = arguments[0];
        let args_arr = [];

        for (let index = 1; index < number_of_args - 1; index++) {
            args_arr.push(arguments[index]);
        }

        if (typeof (arguments[number_of_args - 1]) === "function") {
            let callback = arguments[number_of_args - 1];
            args_arr.push(function (err, result) {
                if (result && redis_command === "hgetall" && typeof (result) === "object" && Object.keys(result).length == 0) result = null;
                callback(err, result);
            });
        } else {
            args_arr.push(arguments[number_of_args - 1]);
        }

        return global.redis_client[redis_command].apply(global.redis_client, args_arr);
    }
};