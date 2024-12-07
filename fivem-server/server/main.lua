RegisterServerEvent('cad:createCall')
AddEventHandler('cad:createCall', function(data)
    print('Neuer Einsatz: ' .. data.description)
    -- Sende die Daten an die Backend-API
end)
