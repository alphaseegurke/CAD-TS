RegisterCommand('login', function(source, args, rawCommand)
    local username = args[1]
    local password = args[2]

    PerformHttpRequest("http://127.0.0.1:5000/login", function(statusCode, responseText, headers)
        if statusCode == 200 then
            local data = json.decode(responseText)
            print("Login successful! Role: " .. data.role)
        else
            print("Login failed: " .. responseText)
        end
    end, "POST", json.encode({username = username, password = password}), {["Content-Type"] = "application/json"})
end)
