
import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { App } from '@capacitor/app';

const Index = () => {
  const [gateway, setGateway] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const requestPermissions = async () => {
    try {
      // Em um dispositivo real, isso solicitará as permissões necessárias
      // Note que algumas permissões precisam ser solicitadas em tempo de execução
      await App.requestPermissions({
        permissions: ["location"]
      });
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
    }
  };

  const getNetworkInfo = async () => {
    try {
      // Em um dispositivo Android real, você usaria a API nativa 
      // para obter o gateway através do WifiManager
      // Por enquanto, vamos usar um método simulado
      const status = await Network.getStatus();
      
      if (!status.connected) {
        throw new Error("Sem conexão WiFi");
      }

      // Em um dispositivo real, isso seria substituído pela 
      // chamada real para obter o gateway
      // Exemplo: WifiManager.getDhcpInfo().gateway
      setGateway("192.168.1.1");
      
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      }
      setGateway(null);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await requestPermissions();
      await getNetworkInfo();
      setLoading(false);
    };

    initialize();
  }, []);

  const checkNetwork = async () => {
    setLoading(true);
    await getNetworkInfo();
    setLoading(false);
  };

  const openRouterConfig = () => {
    if (gateway) {
      window.open(`http://${gateway}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6 backdrop-blur-sm bg-white/90 border-gray-200">
          <h1 className="text-2xl font-semibold mb-2 text-gray-900">
            WiFi Gateway Explorer
          </h1>
          <p className="text-gray-600 mb-6">
            Detecte e acesse a configuração do seu roteador
          </p>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500">Gateway detectado</p>
                <p className="text-lg font-medium text-gray-900">{gateway || "Não detectado"}</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={openRouterConfig}
                  disabled={!gateway}
                  className="w-full bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  Acessar Configuração
                </Button>
                <Button
                  onClick={checkNetwork}
                  variant="outline"
                  className="px-4"
                >
                  Atualizar
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
