import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useApp, Product, Order, Settings, CategoryItem } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Plus, Trash2, Package, ShoppingCart, CheckCircle, XCircle, Pencil, Save, X, Settings as SettingsIcon, Upload, Image, Phone, Store, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Admin() {
  const { isAuthenticated, login, updateCredentials, products, orders, settings, categories, addProduct, updateProduct, deleteProduct, updateOrderStatus, updateSetting, addCategory, deleteCategory } = useApp();
  
  if (!isAuthenticated) {
    return <LoginView onLogin={login} />;
  }

  return (
    <DashboardView 
      products={products} 
      orders={orders}
      settings={settings}
      categories={categories}
      onAdd={addProduct}
      onUpdate={updateProduct} 
      onDelete={deleteProduct}
      onUpdateStatus={updateOrderStatus}
      onUpdateSetting={updateSetting}
      onAddCategory={addCategory}
      onDeleteCategory={deleteCategory}
      onUpdateCredentials={updateCredentials}
    />
  );
}

function LoginView({ onLogin }: { onLogin: (u: string, p: string) => Promise<boolean> }) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: any) => {
    await onLogin(data.username, data.password);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/80 border-white/10 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display">Acceso Admin</CardTitle>
          <CardDescription>
            Ingresa tus credenciales de Paudronix GT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input 
                id="username" 
                placeholder="usuario@paudronix..." 
                {...register("username", { required: true })} 
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                {...register("password", { required: true })} 
                className="bg-black/20 border-white/10"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardView({ 
  products, 
  orders,
  settings,
  categories,
  onAdd,
  onUpdate, 
  onDelete,
  onUpdateStatus,
  onUpdateSetting,
  onAddCategory,
  onDeleteCategory,
  onUpdateCredentials
}: { 
  products: Product[], 
  orders: Order[],
  settings: Settings,
  categories: CategoryItem[],
  onAdd: (p: Product) => void, 
  onUpdate: (id: string, p: Partial<Product>) => void,
  onDelete: (id: string) => void,
  onUpdateStatus: (id: string, status: any) => void,
  onUpdateSetting: (key: string, value: string) => void,
  onAddCategory: (c: Omit<CategoryItem, "id">) => void,
  onDeleteCategory: (id: string) => void,
  onUpdateCredentials: (currentPassword: string, newUsername?: string, newPassword?: string) => Promise<boolean>
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [whatsappInput, setWhatsappInput] = useState(settings.whatsappNumber);
  const [bgImageInput, setBgImageInput] = useState(settings.backgroundImage);
  const [storeNameInput, setStoreNameInput] = useState(settings.storeName);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newCatName, setNewCatName] = useState("");
  const [newCatLabel, setNewCatLabel] = useState("");
  const [isMonthly, setIsMonthly] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [showCheckmarks, setShowCheckmarks] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingCredentials, setSavingCredentials] = useState(false);

  React.useEffect(() => {
    setWhatsappInput(settings.whatsappNumber);
    setBgImageInput(settings.backgroundImage);
    setStoreNameInput(settings.storeName);
  }, [settings.whatsappNumber, settings.backgroundImage, settings.storeName]);
  
  const onSubmitProduct = (data: any) => {
    if (editingId) {
       onUpdate(editingId, {
         name: data.name,
         category: data.category,
         price: parseFloat(data.price),
         image: data.image,
         description: data.description || "",
         whatsappNumber: data.whatsappNumber || null,
         isMonthly: isMonthly,
         inStock: inStock,
         showCheckmarks: showCheckmarks
       });
       setEditingId(null);
    } else {
      const newProduct: any = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description || "",
        image: data.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500",
        whatsappNumber: data.whatsappNumber || null,
        isMonthly: isMonthly,
        inStock: inStock,
        showCheckmarks: showCheckmarks
      };
      onAdd(newProduct);
    }
    reset();
    setIsMonthly(true);
    setInStock(true);
    setShowCheckmarks(true);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setValue("name", product.name);
    setValue("category", product.category);
    setValue("price", product.price);
    setValue("image", product.image);
    setValue("description", product.description || "");
    setValue("whatsappNumber", (product as any).whatsappNumber || "");
    setIsMonthly((product as any).isMonthly !== false);
    setInStock((product as any).inStock !== false);
    setShowCheckmarks((product as any).showCheckmarks !== false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
    setIsMonthly(true);
    setInStock(true);
    setShowCheckmarks(true);
  };

  const handleSaveWhatsapp = () => {
    onUpdateSetting("whatsappNumber", whatsappInput);
  };

  const handleSaveBackgroundImage = () => {
    onUpdateSetting("backgroundImage", bgImageInput);
  };

  const handleSaveStoreName = () => {
    onUpdateSetting("storeName", storeNameInput);
  };

  const handleSaveCredentials = async () => {
    if (!currentPassword) return;
    setSavingCredentials(true);
    const success = await onUpdateCredentials(currentPassword, newUsername || undefined, newPassword || undefined);
    if (success) {
      setCurrentPassword("");
      setNewUsername("");
      setNewPassword("");
    }
    setSavingCredentials(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBgImageInput(data.url);
        onUpdateSetting("backgroundImage", data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Panel de Administracion</h1>
      </div>

      <div className="w-full">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="border-border bg-card/50 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingId ? <Pencil className="w-5 h-5 text-secondary" /> : <Plus className="w-5 h-5 text-primary" />} 
                    {editingId ? "Editar Producto" : "Agregar Producto"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmitProduct)} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nombre del Producto</Label>
                      <Input {...register("name", { required: true })} className="bg-muted/50" placeholder="Ej. Netflix 4K" data-testid="input-product-name" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Categoria</Label>
                        <Input 
                          {...register("category", { required: true })} 
                          list="category-options"
                          className="bg-muted/50"
                          placeholder="Escribe o selecciona..."
                          data-testid="input-category"
                        />
                        <datalist id="category-options">
                          {Array.from(new Set(products.map(p => p.category))).filter(Boolean).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </datalist>
                      </div>
                      <div className="space-y-2">
                        <Label>Precio (Q)</Label>
                        <Input type="number" {...register("price", { required: true })} className="bg-muted/50" defaultValue="15" data-testid="input-price" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Imagen del Producto</Label>
                      <Input {...register("image")} className="bg-muted/50" placeholder="https://... o sube una imagen" data-testid="input-image-url" />
                      <div className="flex gap-2 mt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="flex-1"
                        >
                          <Upload className="w-4 h-4 mr-2" /> {uploading ? "Subiendo..." : "Subir desde dispositivo"}
                        </Button>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploading(true);
                          const formData = new FormData();
                          formData.append("image", file);
                          try {
                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                            if (res.ok) {
                              const data = await res.json();
                              setValue("image", data.url);
                            }
                          } catch (error) {
                            console.error("Upload failed:", error);
                          } finally {
                            setUploading(false);
                          }
                        }} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Numero de WhatsApp (opcional)</Label>
                      <Input {...register("whatsappNumber")} className="bg-muted/50" placeholder="50212345678" data-testid="input-whatsapp-number" />
                      <p className="text-xs text-muted-foreground">Si lo dejas vacio, usara el numero principal de la tienda</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isMonthly" 
                        checked={isMonthly} 
                        onCheckedChange={(checked) => setIsMonthly(checked === true)}
                        data-testid="checkbox-is-monthly"
                      />
                      <Label htmlFor="isMonthly" className="cursor-pointer">Mostrar "/ mes" en el precio</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="inStock" 
                        checked={inStock} 
                        onCheckedChange={(checked) => setInStock(checked === true)}
                        data-testid="checkbox-in-stock"
                      />
                      <Label htmlFor="inStock" className="cursor-pointer">Disponible (desmarcar si esta sin stock)</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Descripcion (opcional)</Label>
                      <Textarea {...register("description")} className="bg-muted/50" placeholder="Escribe cada linea y aparecera separada..." data-testid="input-description" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="showCheckmarks" 
                        checked={showCheckmarks} 
                        onCheckedChange={(checked) => setShowCheckmarks(checked === true)}
                        data-testid="checkbox-show-checkmarks"
                      />
                      <Label htmlFor="showCheckmarks" className="cursor-pointer">Mostrar ✓ en cada linea de la descripcion</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className={`w-full font-bold ${editingId ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`} data-testid="button-submit-product">
                        {editingId ? <><Save className="w-4 h-4 mr-2"/> Guardar Cambios</> : <><Plus className="w-4 h-4 mr-2"/> Publicar Producto</>}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={handleCancelEdit} data-testid="button-cancel-edit">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" /> Inventario Actual ({products.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-muted/50 border-border">
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className={`hover:bg-muted/50 border-border ${editingId === product.id ? 'bg-primary/10' : ''}`} data-testid={`row-product-${product.id}`}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <img src={product.image} className="w-8 h-8 rounded object-cover" alt="" />
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{product.category}</TableCell>
                          <TableCell>Q{product.price}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-secondary hover:text-secondary hover:bg-secondary/10"
                                onClick={() => handleEdit(product)}
                                data-testid={`button-edit-${product.id}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => onDelete(product.id)}
                                data-testid={`button-delete-${product.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Cambiar Credenciales de Admin
                  </CardTitle>
                  <CardDescription>
                    Actualiza tu usuario y contraseña de acceso al panel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Contraseña Actual (requerida)</Label>
                    <Input 
                      type="password" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      className="bg-muted/50" 
                      placeholder="Escribe tu contraseña actual"
                      data-testid="input-current-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nuevo Usuario (opcional)</Label>
                    <Input 
                      value={newUsername} 
                      onChange={(e) => setNewUsername(e.target.value)} 
                      className="bg-muted/50" 
                      placeholder="Dejar vacio para no cambiar"
                      data-testid="input-new-username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nueva Contraseña (opcional)</Label>
                    <Input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="bg-muted/50" 
                      placeholder="Dejar vacio para no cambiar"
                      data-testid="input-new-password"
                    />
                  </div>
                  <Button 
                    onClick={handleSaveCredentials} 
                    disabled={!currentPassword || savingCredentials}
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="button-save-credentials"
                  >
                    <Save className="w-4 h-4 mr-2" /> {savingCredentials ? "Guardando..." : "Guardar Credenciales"}
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
      </div>
    </div>
  );
}
