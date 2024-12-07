RegisterServerEvent('cad:createCall')
AddEventHandler('cad:createCall', function(data)
    print('Neue Anfrage empfangen: ' .. data.description)
    -- Hier könnte man die Daten in die Datenbank einfügen
end)
