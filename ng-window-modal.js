angular.module('ngWindowModal', [])

        .factory('$windowModal', ['$q', function ($q) {
                return {
                    open: function (options) {
                        var settings = {
                            target: "_blank",
                            options: {
                                toolbar: false,
                                location: false,
                                menubar: false
                            }
                        }
                        angular.merge(settings, options);
                        return $q(function (resolveModal, rejectModal) {
                            var windowSettings = [];
                            angular.forEach(settings.options, function (value, index) {
                                windowSettings.push(index + "=" + value);
                            })
                            windowSettings = windowSettings.join(',');
                            var modal = window.open(settings.url, settings.target, windowSettings);
                            angular.element(modal).on('load', function () {
                                modal.resolveModal = function (data) {
                                    resolveModal(data);
                                    modal.resolved = true;
                                    modal.close();
                                }
                                modal.rejectModal = function (data) {
                                    rejectModal(data);
                                    modal.rejected = true;
                                    modal.close();
                                }
                            })
                            angular.element(modal).on('unload', function () {
                                if (options.onClose) {
                                    options.onClose();
                                }
                                if (!modal.rejected && !modal.resolved) {
                                    rejectModal();
                                }
                            })
                        })
                    }
                }
            }
        ])