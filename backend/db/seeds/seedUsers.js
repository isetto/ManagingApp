exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    "login": "dmitry",
                    "password": "dmitry123",
                    "permissions": "worker"
                },
                {
                    "login": "krzysztof",
                    "password": "krzysztof123",
                    "permissions": "worker"
                },
                {
                    "login": "pawel",
                    "password": "pawel123",
                    "permissions": "ambasador"
                },
                {
                    "login": "zbyszek",
                    "password": "zbyszek123",
                    "permissions": "admin"
                }
            ]);
        });
};

