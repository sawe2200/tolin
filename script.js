$(document).ready(function() {
    // Fetch refinable items from Albion Online API
    $.get("https://albion-online-data.com/api/v2/stats/overview.json", function(data) {
        const items = data.items;
        const itemSelect = $('#itemSelect');
        
        items.forEach(item => {
            itemSelect.append(new Option(item.name, item.item_id));
        });

        // Set item value when an item is selected
        itemSelect.change(function() {
            const selectedItem = $(this).val();
            const selectedItemData = items.find(item => item.item_id === selectedItem);
            $('#itemValue').val(selectedItemData.sell_price_min);
        });
    });

    $('#calculateButton').click(function() {
        // Get input values
        const itemValue = parseFloat($('#itemValue').val());
        const productPrice = parseFloat($('#productPrice').val());
        const resourcesCosts = parseFloat($('#resourcesCosts').val());
        const returnRate = parseFloat($('#returnRate').val());
        const craftAmount = parseFloat($('#craftAmount').val());

        // Calculate Fee and Profit
        const fee = itemValue * 0.1125;
        const profit = (productPrice - resourcesCosts + (resourcesCosts / 100 * returnRate) - fee) * craftAmount;
        const profitPercentage = ((profit / (resourcesCosts * craftAmount)) * 100).toFixed(2);

        // Display results
        $('#fee').text(fee.toFixed(2));
        $('#profit').text(profit.toFixed(2));
        $('#profitPercentage').text(profitPercentage + '%');
    });
});
