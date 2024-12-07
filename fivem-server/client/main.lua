RegisterCommand('call', function(source, args)
    local description = table.concat(args, " ")
    TriggerServerEvent('cad:createCall', { description = description })
end)
